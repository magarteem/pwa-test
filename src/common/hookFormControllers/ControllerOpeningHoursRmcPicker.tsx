import { Controller } from "react-hook-form";
import { RmcDatePicker } from "../ui-elements/rmc-picker/RmcDatePicker";
import s from "./formFields.module.scss";

export interface ControllerOpeningHoursRmcPickerType {
 control: any;
 watch?: any;
 required?: boolean;
}

export const ControllerOpeningHoursRmcPicker = ({
 control,
 watch,
 required = false,
}: ControllerOpeningHoursRmcPickerType) => {
 return (
  <div className={s.ageRange}>
   <div className={s.styleInput}>
    <Controller
     name="from_opening_hours"
     control={control}
     rules={{
      required: required || watch("to_opening_hours") ? "со скольки ?" : false,
     }}
     render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
      <RmcDatePicker
       mode="time"
       placeholder="Часы работы с"
       values={value}
       onChange={onChange}
       errors={errors.from_opening_hours}
       required={required}
       {...field}
      />
     )}
    />
   </div>

   <div className={s.styleInput}>
    <Controller
     name="to_opening_hours"
     control={control}
     rules={{
      required: required || watch("from_opening_hours") ? "до скольки?" : false,
      min: { value: watch("from_opening_hours"), message: "Не корректное время" },
     }}
     render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
      <RmcDatePicker
       mode="time"
       placeholder="До"
       values={value}
       onChange={onChange}
       errors={errors.to_opening_hours}
       required={required}
       min={watch("from_opening_hours")}
       {...field}
      />
     )}
    />
   </div>
  </div>
 );
};
