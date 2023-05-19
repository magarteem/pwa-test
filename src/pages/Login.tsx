import { useState, useEffect } from "react";
import { LoginSocial } from "../common/components/signIn/loginSocial/LoginSocialNetwork";
import { RegistrationQuestionLink } from "../common/components/signIn/registrationQuestion/RegistrationQuestionLink";
import { CommonLoginLayout } from "../common/layout/commonLogin/CommonLoginLayout";
import { WrapperFullScreen } from "../common/layout/wrapperFullScreen/WrapperFullScreen";
import { SnackbarWarning } from "../common/mui-element/snackbar/SnackbarWarning";
import { RouteNames } from "../core/router/RouteNames";
import { FormLogin } from "../modules/authorization/FormLogin";
import { useAppSelector } from "../core/redux/app/hooks";
import s from "./styles/loginPage.module.scss";

export const Login = () => {
 const loginData = useAppSelector((state) => state.authSliceReducer.error);
 const [open, setOpen] = useState(false);

 useEffect(() => {
  loginData && setOpen(true);
 }, [loginData]);

 return (
  <WrapperFullScreen>
   <CommonLoginLayout>
    <div className={s.fieldLogin}>
     <FormLogin setOpen={setOpen} />

     {/*<LoginSocial />*/}
    </div>

    <RegistrationQuestionLink
     questionText="Нет аккаунта?"
     linkTo={RouteNames.REGISTER}
     lintText="ЗАРЕГИСТРИРОВАТЬСЯ"
    />
   </CommonLoginLayout>

   {open && (
    <SnackbarWarning
     text="Не верный логин или пароль"
     open={open}
     setOpen={setOpen}
     severity={"error"}
    />
   )}
  </WrapperFullScreen>
 );
};
