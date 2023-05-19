import { useState } from "react";
import eye_open from "../../assets/icons/eye_open.webp";
import eye_close from "../../assets/icons/eye_close.webp";
import { Controller, useForm } from "react-hook-form";
import { InButton } from "../../common/ui-elements/button/InButton";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../core/redux/app/hooks";
import { authThunkLogin } from "./authThunkLogin";
import { RouteNames } from "../../core/router/RouteNames";
import { Input } from "../../common/ui-elements/Input/Input";
import s from "./style/formLogin.module.scss";
import { LoginRequestType } from "../../types/SSO/loginResponseType";

interface FormLoginType {
 setOpen: (set: boolean) => void;
}

export const FormLogin = ({ setOpen }: FormLoginType) => {
 const dispatch = useAppDispatch();
 const [eye, setEye] = useState(false);
 const toggleEye = () => setEye((prev) => !prev);

 const {
  control,
  handleSubmit,
  watch,
  formState: { errors },
 } = useForm<LoginRequestType>({
  mode: "onBlur",
  defaultValues: {
   email: "",
   password: "",
  },
 });

 const onSubmit = (data: LoginRequestType) => {
  dispatch(authThunkLogin(data));
  // navigate(RouteNames.HOME, { replace: true });
 };

 return (
  <form className={s.formLogin} onSubmit={handleSubmit(onSubmit)}>
   <div className={s.styleInput}>
    <h2 className={s.title}>Email</h2>
    <Controller
     name="email"
     control={control}
     rules={{
      required: "Email обязателен",
      pattern: {
       value: /\S+@\S+\.\S+/,
       message: "Это не Email",
      },
     }}
     render={({ field: { onChange } }) => (
      <Input
       type="text"
       placeholder="Email"
       errors={errors.email && errors.email.message}
       errorBackgroundOrange={errors.email}
       onChange={onChange}
      />
     )}
    />
   </div>

   <div className={s.styleInput}>
    <h2 className={s.title}>Пароль</h2>
    <Controller
     name="password"
     control={control}
     rules={{
      required: "Обязательное поле",
      minLength: {
       value: 3,
       message: "Не менее 3х символов",
      },
     }}
     render={({ field: { onChange } }) => (
      <Input
       type={eye ? "text" : "password"}
       placeholder="Password"
       errors={errors.password && errors.password.message}
       errorBackgroundOrange={errors.password}
       onChange={onChange}
      >
       {watch("password").length > 0 && (
        <img
         onClick={toggleEye}
         className={s.see}
         src={eye ? eye_open : eye_close}
         alt={eye ? eye_open : eye_close}
        />
       )}
      </Input>
     )}
    />
   </div>

   <Link to={RouteNames.REQUEST_RESET_PASSWORD} className={s.forgetPassword}>
    <span className={s.forgotPasswordText}>Забыли пароль ?</span>
   </Link>

   <div className={s.styleBtn}>
    <InButton textButton="ВОЙТИ" />
   </div>
  </form>
 );
};
