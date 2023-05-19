import { Controller, useForm } from "react-hook-form";
import { InButton } from "../../common/ui-elements/button/InButton";
import { RecoveryPassGetInstructionsFormType } from "./types/recoveryPasswordType";
import { Input } from "../../common/ui-elements/Input/Input";
import { useRequestResetPasswordMutation } from "./authQuery";
import { PreLoader } from "../../common/components/preLoader/PreLoader";
import s from "./style/recoveryPassGetInstructionsForm.module.scss";

export const RecoveryPassGetInstructionsForm = () => {
 const [requestResetPassword, { isLoading, isError, isSuccess }] =
  useRequestResetPasswordMutation();

 const {
  watch,
  control,
  handleSubmit,
  formState: { errors },
 } = useForm<RecoveryPassGetInstructionsFormType>({
  mode: "onBlur",
  defaultValues: {
   email: "",
  },
 });

 const onSubmit = (data: RecoveryPassGetInstructionsFormType) => {
  console.log("isError");
  requestResetPassword({ email: data.email });
 };

 console.log("---", isLoading, isError, isSuccess);
 return (
  <form className={s.recoveryPassword} onSubmit={handleSubmit(onSubmit)}>
   <div className={s.styleInput}>
    <h2 className={s.title}>Email</h2>
    <Controller
     name="email"
     control={control}
     rules={{
      required: "Введите Email",
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

   <div className={s.styleBtn}>
    {isLoading ? (
     <PreLoader />
    ) : isSuccess ? (
     // <a className={s.buttonAction} href={`mailto:${watch("email")}`}>
     <InButton type="button" textButton={`Посетить почту ${watch("email")}`} />
    ) : // </a>
    isError ? (
     <InButton textButton="Email не найден" />
    ) : (
     <InButton textButton="Отправить" />
    )}
   </div>

   {/*<div className={s.styleBtn}>
    <InButton textButton="Отправить" />
   </div>*/}
  </form>
 );
};
