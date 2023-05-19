import { Controller } from "react-hook-form";
import cn from "classnames";
import s from "../formFields.module.scss";
import { UploadAvatar } from "./UploadAvatar";

export interface ControllerUploadAvatarType {
 control: any;
 name: string;
}

export const ControllerUploadAvatar = ({ control, name }: ControllerUploadAvatarType) => {
 return (
  <div className={cn(s.selectField, s.autoHeight)}>
   <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value, ...field } }) => (
     <UploadAvatar onChange={onChange} value={value} />
    )}
   />
  </div>
 );
};
