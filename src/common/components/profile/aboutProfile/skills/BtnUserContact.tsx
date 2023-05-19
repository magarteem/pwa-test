import { CircularProgress } from "@mui/material";
import { EnumContactRequestStatusResponse } from "../../../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { useSendContactReplyMutation } from "../../../../../modules/notification/notificationQuery";
import { useParams } from "react-router-dom";
import { useGetOtherUserProfileForIDQuery } from "../../../../../modules/user/getGetMyProfileQuery";
import { EnumPrivateType } from "../../../../../types/PROFILE/enum/EnumPrivateType";
import s from "./btnUserContact.module.scss";

interface BtnUserType {
 id_userForm: string;
 parseJsonId: string;
 privateType: EnumPrivateType;
 contactRequestStatus:
  | EnumContactRequestStatusResponse.NO_REQUEST
  | EnumContactRequestStatusResponse.PENDING
  | EnumContactRequestStatusResponse.APPROVED
  | EnumContactRequestStatusResponse.MY_FORM;
}

export const BtnUserContact = ({
 id_userForm,
 parseJsonId,
 privateType,
 contactRequestStatus,
}: BtnUserType) => {
 const [sendContactReply, { isLoading, isSuccess, isError }] = useSendContactReplyMutation();
 const { id_user } = useParams();
 const { refetch } = useGetOtherUserProfileForIDQuery(id_user || "");
 const contactReply = () => {
  sendContactReply({
   id_userForm,
   parseJsonId,
  })
   .unwrap()
   .then((res) => refetch());
 };

 return (
  <div className={s.btnWrapperPosition}>
   <div className={s.btnUserContact}>
    {privateType === EnumPrivateType.HIDE_ALL ? (
     <button disabled={true} className={s.buttonContactWrapper}>
      Закрытая анкета
     </button>
    ) : isLoading ? (
     <CircularProgress size={30} />
    ) : isError ? (
     <button onClick={contactReply} className={s.buttonContactWrapper}>
      Ошибка, повторить запрос
     </button>
    ) : isSuccess ? (
     <button disabled={true} className={s.buttonContactWrapper}>
      Контакт запрошен
     </button>
    ) : contactRequestStatus === EnumContactRequestStatusResponse.APPROVED ? (
     <button onClick={contactReply} disabled={true} className={s.buttonContactWrapper}>
      Запрос контактов одобрен
     </button>
    ) : (
     <button
      onClick={contactReply}
      disabled={contactRequestStatus === EnumContactRequestStatusResponse.PENDING}
      className={s.buttonContactWrapper}
     >
      {contactRequestStatus === EnumContactRequestStatusResponse.NO_REQUEST
       ? "Запросить контакты"
       : "Контакт запрошен"}
     </button>
    )}
   </div>
  </div>
 );
};
