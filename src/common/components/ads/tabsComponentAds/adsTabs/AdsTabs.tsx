import { useOutletContext } from "react-router-dom";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { PreLoader } from "../../../preLoader/PreLoader";
import { AnnouncementFeed } from "../../announcementFeed/AnnouncementFeed";
import { ResponseAdsType } from "../../../../../modules/ads/types/responseAdsType";
import { InButton } from "../../../../ui-elements/button/InButton";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useSwipeHandleTouch } from "../../../../../hook/useSwipeHandleTouch";
import s from "../toutchStyleAnimations.module.scss";

const routL = `${RouteNames.ADS}`;
const routR = `${RouteNames.ADS}/${RouteNames.ADS_QUESTIONNAIRE_LIST}`;

interface OutletType {
 setPageFu: () => void;
 refetchFu: () => void;
 isLoadingAds: boolean;
 isFetchingAds: boolean;
 dataAds: ResponseAdsType;
}

export const AdsTabs = () => {
 const touchFu = useSwipeHandleTouch(routL, routR);
 const { isLoadingAds, isFetchingAds, setPageFu, refetchFu, dataAds }: OutletType =
  useOutletContext();

 if (isLoadingAds) return <PreLoader />;

 const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => touchFu("start", e);
 const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => touchFu("move", e);

 return (
  <div className={s.minHeight70} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingAds}>
    {dataAds?.results.length > 0 &&
     dataAds?.results.map((x) => <AnnouncementFeed x={x} key={x.id} />)}

    {dataAds?.results.length === 0 && !isFetchingAds && (
     <InButton textButton="Ничего не найдено. Назад" isValidInButton={false} onClick={refetchFu} />
    )}
   </RibbonLayout>
  </div>
 );
};
