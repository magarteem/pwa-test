import { Outlet, useOutletContext } from "react-router-dom";
import { LoginResponseType } from "../../../types/SSO/loginResponseType";
import s from "./firstToStepsLayout.module.scss";

interface OutletType {
 responseLogin: LoginResponseType;
 loading: boolean;
 error: boolean;
}

export const FirstToStepsLayout = () => {
 const { responseLogin, loading, error }: OutletType = useOutletContext();

 return (
  <div className={s.firstToStepsLayout}>
   <Outlet context={{ responseLogin, loading, error }} />
  </div>
 );
};
