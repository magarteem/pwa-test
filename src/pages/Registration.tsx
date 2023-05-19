import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";
import { ISignUpFormValues } from "../modules/authorization/types/authType";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import { useAppDispatch, useAppSelector } from "../core/redux/app/hooks";
import { updateDataMyFormTypeAccountThunk } from "../modules/user/updateDataMyFormTypeAccountThunk";
import { putUpdateMyFormAccountData } from "../modules/user/helpers/putUpdateMyFormAccountData";
import { getJsonParseLocalStorage } from "../helpers/getJsonParseLocalStorage";
import { authThunkCreateMyTypeForms } from "../modules/authorization/authThunkCreateMyTypeForms";
import {
 useChangeAvatarMutation,
 useSendPortfolioImgMutation,
} from "../modules/user/getGetMyProfileQuery";
import { SnackbarGlobal, StateSnackbarType } from "../common/mui-element/snackbar/SnackbarGlobal";
import s from "./styles/registrationPage.module.scss";

export const Registration = () => {
 const { error, responseLogin, loading, thisMyFormsId } = useAppSelector(
  (state) => state.authSliceReducer
 );
 const [setAvatar] = useChangeAvatarMutation();
 const [setData] = useSendPortfolioImgMutation();
 const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType | null>(null);
 const [bodyData, setBodyData] = useState<any>(null);

 const dispatch = useAppDispatch();

 const method = useForm<ISignUpFormValues>({
  mode: "onBlur",
  defaultValues: {
   email: "",
   password: "",
   type_account: null,
   type_collective: null,
   institutionType: null,
   name_field: "",
   img_upload: "",
   city: null,
   gender: null,
   age: null,
   tool: [],
   genre: [],
   master: null,
   work_experience: "",
   portfolio_photo: [],
   education: "",
   private_settings: null,
   inspiration: "",
   web_site: "",
   email_contact: "",
   phone: "",
   area: null,
   establishment_description: "",
   from_opening_hours: null,
   to_opening_hours: null,
   address: "",
  },
 });

 useEffect(() => {
  error && setOpenSnackbar({ open: true, text: "Этот Email уже занят", severity: "error" });
 }, [error]);

 const onSubmit = (data: ISignUpFormValues) => {
  //@ts-ignore
  const typeAccount = method.watch("type_account")?.value;
  let bodyDataSend = putUpdateMyFormAccountData(data, typeAccount);
  setBodyData(bodyDataSend);

  dispatch(authThunkCreateMyTypeForms(typeAccount));
 };

 useEffect(() => {
  const typeAccount = getJsonParseLocalStorage() || "{}";
  const img_upload = method.watch("img_upload");
  const portfolio_photo = method.watch("portfolio_photo");

  const disp = () => {
   !!thisMyFormsId &&
    bodyData &&
    dispatch(
     updateDataMyFormTypeAccountThunk({
      typeAccount,
      bodyDataSend: bodyData,
     })
    );
  };

  if (!!img_upload) {
   setAvatar({
    formDataImg: img_upload,
    profileId: thisMyFormsId,
   })
    .unwrap()
    .then(() => {
     // !!portfolio_photo
     portfolio_photo instanceof FormData
      ? setData({
         //@ts-ignore
         formDataImg: portfolio_photo,
         profileId: thisMyFormsId,
        })
         .unwrap()
         .then(() => disp())
      : disp();
    });
   //} else if (!!portfolio_photo) {
  } else if (portfolio_photo && portfolio_photo instanceof FormData) {
   setData({
    //@ts-ignore
    formDataImg: portfolio_photo,
    profileId: thisMyFormsId,
   })
    .unwrap()
    .then(() => disp())
    .catch(() => console.log("Err REG"));
  } else {
   !!thisMyFormsId && bodyData && disp();
  }
 }, [thisMyFormsId]);

 return (
  <WrapperFullScreen>
   <FormProvider {...method}>
    <form noValidate className={s.formRegister} onSubmit={method.handleSubmit(onSubmit)}>
     <Outlet context={{ responseLogin, loading, error }} />
    </form>
   </FormProvider>

   {openSnackbar && (
    <SnackbarGlobal
     text={openSnackbar.text}
     open={openSnackbar.open}
     setOpen={setOpenSnackbar}
     severity={openSnackbar.severity}
    />
   )}
  </WrapperFullScreen>
 );
};
