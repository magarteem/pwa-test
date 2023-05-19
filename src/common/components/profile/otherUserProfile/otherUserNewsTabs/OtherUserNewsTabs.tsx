import { useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { otherUserDataQuery } from "../../../../../modules/user/otherUserDataQuery";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { InButton } from "../../../../ui-elements/button/InButton";
import { PreLoader } from "../../../preLoader/PreLoader";
import { CardsNewsItemPreview } from "../../../timeLine/cardsNewsItemPreview/CardsNewsItemPreview";
import { RouteNames } from "../../../../../core/router/RouteNames";
import { useSwipeHandleTouchTemp } from "../../../../../hook/useSwipeHandleTouchTemp";
import cn from "classnames";
import s from "../toutchStyleAnimations.module.scss";

const useGetAllTodoQueryState = otherUserDataQuery.endpoints.otherUserNews.useQueryState;
const useGetAllTodoQuerySubscription =
 otherUserDataQuery.endpoints.otherUserNews.useQuerySubscription;

export const OtherUserNewsTabs = () => {
 const refs = useRef<HTMLDivElement | null>(null);
 useSwipeHandleTouchTemp(refs, ``, RouteNames.OTHER_USER_VACANCY);

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
 if (!isSuccess) return <PreLoader />;

 return (
  <div ref={refs} className={cn(s.hiddenAnimationLeft, s.minHeight100)}>
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetching}>
    {data.results.length === 0 && <InButton textButton="Нет публикаций" isValidInButton={false} />}

    {data.results.map((x) => (
     <CardsNewsItemPreview itemDataNews={x} key={x.id} myProfileKey={[""]} />
    ))}
   </RibbonLayout>
  </div>
 );
};
