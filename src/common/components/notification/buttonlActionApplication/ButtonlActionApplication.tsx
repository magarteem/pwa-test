import { useAppDispatch, useAppSelector } from "../../../../core/redux/app/hooks";
import {
 notificationQuery,
 useSendAnnouncementAcceptMutation,
 useSendAnnouncementDeclineMutation,
 useSendContactAcceptMutation,
 useSendContactDeclineMutation,
 useSendVacancyAcceptMutation,
 useSendVacancyDeclineMutation,
} from "../../../../modules/notification/notificationQuery";
import {
 ResponseIncomingType,
 ResultIncomingTypeResponse,
} from "../../../../modules/notification/types/responseNotificationType";
import { EnumAnnouncementStatus } from "../../../../types/PROFILE/enum/EnumAnnouncementStatus";
import { BtnInGroupeSaveCancelMui } from "../../navigateButton/BtnInGroupeSaveCancelMui";
import { Received } from "../waitinActionButton/action/Received";
import { Rejected } from "../waitinActionButton/action/Rejected";

interface ButtonlActionApplicationType {
 x: ResultIncomingTypeResponse;
}

export const ButtonlActionApplication = ({ x }: ButtonlActionApplicationType) => {
 const dispatch = useAppDispatch();
 const isActiveForms = useAppSelector((state) => state.userSliceReducer.isActiveForms);
 // const parseJsonMyActiveFormId = isActiveForms && JSON.parse(isActiveForms).id;

 const [sendVacancyAccept] = useSendVacancyAcceptMutation();
 const [sendAnnouncementAccept] = useSendAnnouncementAcceptMutation();
 const [sendVacancyDecline] = useSendVacancyDeclineMutation();
 const [sendAnnouncementDecline] = useSendAnnouncementDeclineMutation();
 const [sendContactAccept] = useSendContactAcceptMutation();
 const [sendContactDecline] = useSendContactDeclineMutation();

 const idPost = x.announcement?.announcementId;
 const userTargetIdForm = x?.requestedFormId;
 const triggerFormId = x.triggerFormId;

 const actionAdsAds = (key: string) => {
  dispatch(
   notificationQuery.util.updateQueryData(
    "listIncoming",
    undefined,
    (draft: ResponseIncomingType) => {
     return {
      ...draft,
      results: draft.results.map((y) => {
       if (y.id === x.id) {
        return {
         ...y,
         status:
          key === "assept" ? EnumAnnouncementStatus.APPROVED : EnumAnnouncementStatus.REJECTED,
        };
       } else return y;
      }),
     };
    }
   )
  );
 };

 const cancelAds = () => {
  if (x.type === "Contact") {
   sendContactDecline({
    requestedFormId: x.requestedFormId,
    triggerFormId,
   })
    .unwrap()
    .then((res) => actionAdsAds("decline"));
  } else if (x.announcement?.announcementType === `Vacancy`) {
   sendVacancyDecline({
    triggerFormId,
    idPost,
   })
    .unwrap()
    .then((res) => actionAdsAds("decline"));
  } else {
   sendAnnouncementDecline({
    triggerFormId,
    idPost,
   })
    .unwrap()
    .then((res) => actionAdsAds("decline"));
  }
 };

 const addAds = () => {
  if (x.type === "Contact") {
   sendContactAccept({
    requestedFormId: x.requestedFormId,
    triggerFormId,
   })
    .unwrap()
    .then((res) => actionAdsAds("assept"))
    .catch((res) => {
     actionAdsAds("assept");
    });
  } else if (x.announcement?.announcementType === `Vacancy`) {
   sendVacancyAccept({
    idPost,
    triggerFormId,
   })
    .unwrap()
    .then((res) => actionAdsAds("assept"));
  } else {
   sendAnnouncementAccept({
    triggerFormId,
    idPost,
   })
    .unwrap()
    .then((res) => actionAdsAds("assept"));
  }
 };

 return (
  <>
   {x.status === EnumAnnouncementStatus.PENDING && (
    <BtnInGroupeSaveCancelMui
     cancelClick={cancelAds}
     onClick={addAds}
     textCancelButton="Отклонить"
     textButton="Принять"
     isValidInButton={false}
    />
   )}
   {x.status === EnumAnnouncementStatus.APPROVED && (
    <Received status={x.status} userTargetIdForm={x.triggerForm.formId} />
   )}
   {x.status === EnumAnnouncementStatus.REJECTED && <Rejected />}
  </>
 );
};
