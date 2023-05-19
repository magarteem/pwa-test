import { useOutletContext } from "react-router-dom";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { PreLoader } from "../../../preLoader/PreLoader";
import { AnnouncementFeed } from "../../announcementFeed/AnnouncementFeed";
import { ResponseAdsType } from "../../../../../modules/ads/types/responseAdsType";
import { InButton } from "../../../../ui-elements/button/InButton";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useSwipeHandleTouch } from "../../../../../hook/useSwipeHandleTouch";
import s from "../toutchStyleAnimations.module.scss";

const routR = `${RouteNames.ADS}/${RouteNames.ADS_LIST}`;

interface OutletType {
 setPageFu: () => void;
 refetchFu: () => void;
 isLoadingVacancy: boolean;
 isFetchingVacancy: boolean;
 dataV: ResponseAdsType;
}

export const VacancyTabs = () => {
 const touchFu = useSwipeHandleTouch(``, routR);
 const { setPageFu, refetchFu, isLoadingVacancy, isFetchingVacancy, dataV }: OutletType =
  useOutletContext();

 if (isLoadingVacancy) return <PreLoader />;

 const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => touchFu("start", e);
 const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => touchFu("move", e);

 return (
  <div
   className={s.hiddenAnimationLeft}
   onTouchStart={handleTouchStart}
   onTouchMove={handleTouchMove}
  >
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingVacancy}>
    {dataV?.results.length > 0 && dataV?.results.map((x) => <AnnouncementFeed x={x} key={x.id} />)}

    {dataV?.results.length === 0 && !isFetchingVacancy && (
     <InButton textButton="Ничего не найдено. Назад" isValidInButton={false} onClick={refetchFu} />
    )}
   </RibbonLayout>
  </div>
 );
};
