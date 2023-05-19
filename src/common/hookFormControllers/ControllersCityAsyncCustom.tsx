import { Controller } from "react-hook-form";
import s from "./formFields.module.scss";
import { CityCustomField } from "../mui-element/сityСustomField/CityCustomField";

export interface ControllersCityAsyncCustomType {
 control: any;
 name: string;
 placeholder: string;
 required?: boolean;
 setValue?: any;
}

export const ControllersCityAsyncCustom = ({
 control,
 name,
 placeholder,
 required = false,
 setValue,
}: ControllersCityAsyncCustomType) => {
 return (
  <div className={s.selectField}>
   <Controller
    name={name}
    control={control}
    render={({
     field: { onChange, value, ref, ...field },
     formState: { errors, defaultValues },
    }) => {
     return (
      <div className={s.wrapperBlockInput}>
       <CityCustomField
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        inputValue={value}
        errors={errors[name]}
        setValue={setValue}
        {...field}
       />
      </div>
     );
    }}
   />
  </div>
 );
};
