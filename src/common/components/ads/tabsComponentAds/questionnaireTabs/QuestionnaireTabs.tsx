import { useOutletContext } from "react-router-dom";
import { ResponseSearchAllFormsType } from "../../../../../modules/user/types/responseSearchAllForms";
import { RibbonLayout } from "../../../../layout/ribbonLayout/RibbonLayout";
import { InButton } from "../../../../ui-elements/button/InButton";
import { PreLoader } from "../../../preLoader/PreLoader";
import { QuestionnaireCards } from "../../questionnaireCards/QuestionnaireCards";
import { useSwipeHandleTouch } from "../../../../../hook/useSwipeHandleTouch";
import { RouteNames } from "../../../../../core/router/RouteNames";
import s from "./questionnaireTabs.module.scss";

const routL = `${RouteNames.ADS}/${RouteNames.ADS_LIST}`;

interface OutletType {
 setPageFu: () => void;
 refetchFu: () => void;
 isLoadingAccount: boolean;
 isFetchingAccount: boolean;
 dataA: ResponseSearchAllFormsType;
}

export const QuestionnaireTabs = () => {
 const touchFu = useSwipeHandleTouch(routL);
 const { setPageFu, refetchFu, dataA, isLoadingAccount, isFetchingAccount }: OutletType =
  useOutletContext();

 if (isLoadingAccount) return <PreLoader />;

 const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => touchFu("start", e);
 const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => touchFu("move", e);

 return (
  <div
   className={s.hiddenAnimationRight}
   onTouchStart={handleTouchStart}
   onTouchMove={handleTouchMove}
  >
   <RibbonLayout setPageFu={setPageFu} isFetching={isFetchingAccount}>
    <h2 className={s.recommendations}>Рекомендации</h2>
    <div className={s.mainQuestionnaire}>
     {dataA?.results.length > 0 &&
      dataA?.results.map((x) => <QuestionnaireCards key={x.formId} x={x} />)}

     {dataA?.results.length === 0 && !isFetchingAccount && (
      <InButton textButton="Ничего не найдено. Назад" isValidInButton={false} onClick={refetchFu} />
     )}
    </div>
   </RibbonLayout>
  </div>
 );
};
