import { Controller } from "react-hook-form";
import s from "./formFields.module.scss";
//import { DatePickerMobile } from "../ui-elements/datePickerMobile/DatePickerMobile";
import { RmcDatePicker } from "../ui-elements/rmc-picker/RmcDatePicker";

export interface ControllerAgeRmcPickerType {
 control: any;
 name: string;
 required?: boolean;
}

export const ControllerAgeRmcPicker = ({
 control,
 name,
 required = false,
}: ControllerAgeRmcPickerType) => {
 return (
  <div className={s.styleInput}>
   <Controller
    name={name}
    control={control}
    rules={{
     required: required ? "Обязательное поле" : false,
    }}
    render={({ field: { onChange, ref, value, ...field }, formState: { errors } }) => (
     //<div className={cn(s.sizeInput, s.wrappPicker)}>
     //  <DatePickerMobile value={value} placeholder="Возраст" onChange={onChange} {...field} />
     //</div>
     <RmcDatePicker
      mode="date"
      placeholder="Возраст"
      values={value}
      onChange={onChange}
      errors={errors.from_opening_hours}
      required={required}
      {...field}
     />
    )}
   />
  </div>
 );
};
