import { Controller } from "react-hook-form";
import { useGetToolDataQuery } from "../../api/getDataForForm/getCityQuery";
import s from "./formFields.module.scss";
import { SelectToolsElement } from "../mui-element/selectToolsElement/SelectToolsElement";

export interface ControllerToolsAsyncNewType {
 control: any;
 name: string;
 placeholder: string;
 required?: boolean;
}

export const ControllerToolsAsync = ({
 control,
 name,
 placeholder,
 required = true,
}: ControllerToolsAsyncNewType) => {
 const { data } = useGetToolDataQuery();

 if (!data) return null;

 return (
  <div className={s.selectField}>
   <Controller
    name={name}
    control={control}
    rules={{
     required: required ? "Обязательное поле" : false,
    }}
    render={({ field: { onChange, ref, value, ...field }, formState: { errors } }) => (
     <SelectToolsElement
      ItemRef={ref}
      value={value}
      placeholder={placeholder}
      required={required}
      options={data}
      onChange={onChange}
      errors={errors[name]}
      {...field}
     />
    )}
   />
  </div>
 );
};
