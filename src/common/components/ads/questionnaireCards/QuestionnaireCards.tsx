import { useState } from "react";
import noAvatar from "../../../../assets/icons/noAvatar.svg";
import { ReactComponent as HourIcons } from "../../../../assets/icons/hourIcons.svg";
import { ReactComponent as ArrowCanselImgIcon } from "../../../../assets/icons/clearIcon.svg";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { RouteNames } from "../../../../core/router/RouteNames";
import { GroupeToolsAndGenreChips } from "../groupeToolsAndGenreChips/GroupeToolsAndGenreChips";
import { calculateAge } from "../../../../helpers/calculateAge";
import { AllFormsType } from "../../../../modules/user/types/responseSearchAllForms";
import { useSendContactReplyMutation } from "../../../../modules/notification/notificationQuery";
import { useAppDispatch, useAppSelector } from "../../../../core/redux/app/hooks";
import { EnumContactRequestStatusResponse } from "../../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { EnumPrivateType } from "../../../../types/PROFILE/enum/EnumPrivateType";
import { SnackbarGlobal, StateSnackbarType } from "../../../mui-element/snackbar/SnackbarGlobal";
import cn from "classnames";
import s from "./questionnaireCards.module.scss";

const formatter = new Intl.NumberFormat("ru", {
 style: "unit",
 unit: "year",
 unitDisplay: "long",
});

interface QuestionnaireCardsType {
 x: AllFormsType;
}

export const QuestionnaireCards = ({ x }: QuestionnaireCardsType) => {
 const dispatch = useAppDispatch();
 const { isActiveForms: idMyForm, allMyForms } = useAppSelector((state) => state.userSliceReducer);
 const parseJsonId = idMyForm && JSON.parse(idMyForm).id;

 const [sendContactReply, { isLoading, isSuccess, isError }] = useSendContactReplyMutation();
 const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType | null>(null);

 // const actionAdsAds = (key: string) => {
 //  dispatch(
 //   getMyProfileQuery.util.updateQueryData(
 //    "listAccount",
 //    undefined,
 //    (draft: ResponseSearchAllFormsType) => {
 //     return {
 //      ...draft,
 //      results: draft.results.map((y) => {
 //       if (y.formId === x.formId) {
 //        return {
 //         ...y,
 //         contactRequestStatus: EnumContactRequestStatusResponse.PENDING,
 //        };
 //       } else return y;
 //      }),
 //     };
 //    }
 //   )
 //  );
 // };

 const contactReply = () => {
  sendContactReply({
   id_userForm: x.formId,
   parseJsonId,
  })
   .unwrap()
   .then((res) => {
    setOpenSnackbar({
     open: true,
     text: "Запрос контакта отправлен",
     severity: "success",
    });
   })
   .catch(() => {
    setOpenSnackbar({
     open: true,
     text: "Ошибка запроса",
     severity: "error",
    });
   });
 };

 return (
  <div className={s.questionnaireCards}>
   <div className={s.headerQuestionnaireCards}>
    <Link to={`${RouteNames.OTHER_PROFILE_USER}/${x.formId}`} className={s.author}>
     <div className={s.avatar}>
      <Avatar alt="avatar" src={x.avatar?.uri ?? noAvatar} />
     </div>
     <div className={s.infoAuthor}>
      <h2 className={s.name}>{x.name}</h2>

      <span className={s.visit}>
       {`${x.city?.title ?? ""}`}
       {!!x.birthday &&
        `${
         x.birthday !== "0001-01-01"
          ? `, ${formatter.format(+calculateAge(new Date(x.birthday).getTime() || 0))}`
          : ""
        }`}
      </span>
     </div>
    </Link>

    {x.contactRequestStatus !== EnumContactRequestStatusResponse.MY_FORM &&
     x.privateType === EnumPrivateType.HIDE_CONTACTS && (
      <button
       onClick={contactReply}
       disabled={x.contactRequestStatus === EnumContactRequestStatusResponse.PENDING}
       className={cn(s.buttonAction)}
      >
       {x.contactRequestStatus === EnumContactRequestStatusResponse.PENDING && (
        <HourIcons className={s.disable} />
       )}
       {x.contactRequestStatus === EnumContactRequestStatusResponse.NO_REQUEST && (
        <ArrowCanselImgIcon />
       )}
      </button>
     )}
   </div>

   {(x.instruments.length > 0 || x.genres.length > 0) && (
    <div className={s.mainQuestionnaireCards}>
     <GroupeToolsAndGenreChips tools={x.instruments} genre={x.genres} />
    </div>
   )}

   {openSnackbar && (
    <SnackbarGlobal
     text={openSnackbar.text}
     open={openSnackbar.open}
     setOpen={setOpenSnackbar}
     severity={openSnackbar.severity}
    />
   )}
  </div>
 );
};
