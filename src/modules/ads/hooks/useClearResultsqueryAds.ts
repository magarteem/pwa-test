import { useAppDispatch } from "../../../core/redux/app/hooks";
import { getMyProfileQuery } from "../../user/getGetMyProfileQuery";
import { adsQuery } from "../../vacancy/adsQuery";

export const useClearResultsqueryAds = () => {
 const dispatch = useAppDispatch();

 const clearListVacancy = () => dispatch(adsQuery.util.resetApiState());
 const clearListAds = () => dispatch(adsQuery.util.resetApiState());
 const clearListAccount = () => dispatch(getMyProfileQuery.util.resetApiState());

 return { clearListVacancy, clearListAds, clearListAccount };
};
