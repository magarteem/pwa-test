import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import { useAppDispatch, useAppSelector } from "../core/redux/app/hooks";
import { RouteNames } from "../core/router/RouteNames";
import { getJsonParseLocalStorage } from "../helpers/getJsonParseLocalStorage";
import { ISignUpFormValues } from "../modules/authorization/types/authType";
import { putUpdateMyFormAccountData } from "../modules/user/helpers/putUpdateMyFormAccountData";
import { updateDataMyFormTypeAccountThunk } from "../modules/user/updateDataMyFormTypeAccountThunk";
import { useEffect, useState } from "react";
import { authThunkCreateMyTypeForms } from "../modules/authorization/authThunkCreateMyTypeForms";
import {
 useChangeAvatarMutation,
 useSendPortfolioImgMutation,
} from "../modules/user/getGetMyProfileQuery";
import s from "./styles/registrationPage.module.scss";

export const AddNewAccount = () => {
 const dispatch = useAppDispatch();
 const navigate = useNavigate();
 const { error, responseLogin, loading, thisMyFormsId } = useAppSelector(
  (state) => state.authSliceReducer
 );
 const [setAvatar] = useChangeAvatarMutation();
 const [setData] = useSendPortfolioImgMutation();

 const [bodyData, setBodyData] = useState<any>(null);
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

 const onSubmit = (data: ISignUpFormValues) => {
  console.log("BUTTON");
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

  const disp = () =>
   !!thisMyFormsId &&
   bodyData &&
   dispatch(
    updateDataMyFormTypeAccountThunk({
     typeAccount,
     bodyDataSend: bodyData,
    })
   ).then(() => navigate(RouteNames.LOGIN, { replace: true }));

  if (!!img_upload) {
   setAvatar({
    formDataImg: img_upload,
    profileId: thisMyFormsId,
   })
    .unwrap()
    .then(() => {
     !!portfolio_photo
      ? setData({
         //@ts-ignore
         formDataImg: portfolio_photo,
         profileId: thisMyFormsId,
        })
         .unwrap()
         .then(() => disp())
      : disp();
    });
  } else if (!!portfolio_photo) {
   setData({
    //@ts-ignore
    formDataImg: portfolio_photo,
    profileId: thisMyFormsId,
   })
    .unwrap()
    .then(() => disp());
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
  </WrapperFullScreen>
 );
};
