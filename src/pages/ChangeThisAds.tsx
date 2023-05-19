import { useLocation, useParams } from "react-router-dom";
import { useOneAnnouncementPostQuery, useOneVacancyPostQuery } from "../modules/vacancy/adsQuery";
import { RouteNames } from "../core/router/RouteNames";
import { ChangeThisAdsForms } from "../modules/vacancy/ChangeThisAdsForms";
import { PreLoader } from "../common/components/preLoader/PreLoader";

export const ChangeThisAds = () => {
 const { change_id_ads } = useParams();
 const { pathname } = useLocation();

 const { data: dataVacancy, isLoading: loadV } = useOneVacancyPostQuery(change_id_ads || "", {
  skip: !pathname.includes(RouteNames.ADS_CHANGE_THIS_ADS),
 });
 const { data: dataAds, isLoading: loadAds } = useOneAnnouncementPostQuery(change_id_ads || "", {
  skip: !pathname.includes(RouteNames.ADS_CHANGE_THIS_ADS_ANNOUNCEMENT),
 });

 if (loadV || loadAds) return <PreLoader />;

 return <ChangeThisAdsForms data={dataVacancy ?? dataAds} />;
};
