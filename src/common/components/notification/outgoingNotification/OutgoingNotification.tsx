import { useOutletContext } from "react-router-dom";
import { AnnouncementCard } from "../../ads/announcementCard/AnnouncementCard";
import { AdsLayoutItem } from "../../../layout/adsLayoutItem/AdsLayoutItem";
import { RouteNames } from "../../../../core/router/RouteNames";
import { ResponseOutgoingType } from "../../../../modules/notification/types/responseNotificationType";
import { reSelectData } from "../../../../modules/notification/helpers/reSelect";
import { WaitingActionButton } from "../waitinActionButton/WaitingActionButton";
import { InButton } from "../../../ui-elements/button/InButton";
import s from "../incomingNotification/incomingNotification.module.scss";

interface OutletType {
  dataOutgoing: ResponseOutgoingType;
}

export const OutgoingNotification = () => {
  const { dataOutgoing }: OutletType = useOutletContext();

  return (
    <div className={s.hiddenAnimationLeft}>
      {dataOutgoing?.results.length === 0 && (
        <InButton textButton="Вы ещё не откликались" isValidInButton={false} />
      )}
      {dataOutgoing?.results?.map((x) => {
        return (
          <AdsLayoutItem key={x.id}>
            <AnnouncementCard
              x={reSelectData(x)}
              link={
                x.type !== "Contact"
                  ? `${
                      x.announcement && x.announcement.announcementType === "Vacancy"
                        ? RouteNames.ONE_VACANCY
                        : RouteNames.ONE_ANNOUNCEMENT
                    }/${x.announcement?.announcementId}`
                  : `${RouteNames.OTHER_PROFILE_USER}/${x.requestedForm.formId}`
              }
            />

            <WaitingActionButton status={x.status} userTargetIdForm={x.requestedForm.formId} />
          </AdsLayoutItem>
        );
      })}
    </div>
  );
};
