import { useRef, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { InButton } from "../../../../ui-elements/button/InButton";
import { AnnouncementFeed } from "../../../ads/announcementFeed/AnnouncementFeed";
import { PreLoader } from "../../../preLoader/PreLoader";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useSwipeHandleTouchTemp } from "../../../../../hook/useSwipeHandleTouchTemp";
import s from "../toutchStyleAnimations.module.scss";

const useGetAllTodoQueryState = otherUserDataQuery.endpoints.otherUserAnnouncement.useQueryState;
const useGetAllTodoQuerySubscription =
 otherUserDataQuery.endpoints.otherUserAnnouncement.useQuerySubscription;

export const OtherUserAdsTabs = () => {
 let location = useLocation();
 const refs = useRef<HTMLDivElement | null>(null);

 const routL = `${location.pathname.replace(
  RouteNames.OTHER_USER_ADS,
  RouteNames.OTHER_USER_VACANCY
 )}`;
 const routR = `${location.pathname.replace(
  RouteNames.OTHER_USER_ADS,
  RouteNames.OTHER_USER_QUESTIONNAIRE
 )}`;

 useSwipeHandleTouchTemp(refs, routL, routR);

 const [id_user]: [string] = useOutletContext();

 const [page, setPage] = useState(0);
 const { data, isLoading, isFetching, isSuccess } = useGetAllTodoQueryState({
  formId: id_user,
  page,
 });

 useGetAllTodoQuerySubscription({
  formId: id_user,
  page,
 });

 const setPageFu = () => {
  data && setPage((prev) => data.currentPage + 1);
 };

 if (isLoading) return <PreLoader />;
 if (!isSuccess) return <p>isSuccess</p>;

 return (
  <div ref={refs} className={s.minHeight100}>
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetching}>
    {data.results.length === 0 && <InButton textButton="Нет публикаций" isValidInButton={false} />}

    {data.results.map((x) => (
     <AnnouncementFeed x={x} key={x.id} />
    ))}
   </RibbonLayout>
  </div>
 );
};
