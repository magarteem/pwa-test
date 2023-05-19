import { Controller } from "react-hook-form";
import { RmcPicker } from "../ui-elements/rmc-picker/RmcPicker";
import s from "./formFields.module.scss";

export interface ControllerAgeRangeRmcPickerType {
 control: any;
 watch: any;
 required?: boolean;
}

export const ControllerAgeRangeRmcPicker = ({
 control,
 watch,
 required = false,
}: ControllerAgeRangeRmcPickerType) => {
 return (
  <div className={s.ageRange}>
   <div className={s.styleInput}>
    <Controller
     name="fromAge"
     control={control}
     rules={{
      required: required || +watch("toAge") ? "со скольки ?" : false,
     }}
     render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
      <div className={s.sizeInput}>
       <RmcPicker
        placeholder="Возраст от"
        values={value}
        onChange={onChange}
        errors={errors.fromAge}
        required={required}
        {...field}
       />
      </div>
     )}
    />
   </div>

   <div className={s.styleInput}>
    <Controller
     name="toAge"
     control={control}
     rules={{
      required: required || watch("fromAge") ? "до скольки?" : false,
      min: { value: +watch("fromAge"), message: "Диапазон по возрастанию" },
     }}
     render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
      <div className={s.sizeInput}>
       <RmcPicker
        placeholder="До"
        values={value}
        onChange={onChange}
        errors={errors.toAge}
        required={required}
        min={watch("fromAge")}
        {...field}
       />
      </div>
     )}
    />
   </div>
  </div>
 );
};
