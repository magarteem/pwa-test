import clearIcon from "../../../assets/icons/clearIcon.svg";
import { useState, useRef } from "react";
import { useChangeAvatarMutation } from "../../../modules/user/getGetMyProfileQuery";
import { PortfolioType } from "../../../types/PROFILE/accountMainGlobalType";
import s from "./uploadPhoto.module.scss";
import { SnackbarGlobal, StateSnackbarType } from "../../mui-element/snackbar/SnackbarGlobal";

interface UploadAvatarType {
 onChange: (a: any) => void;
 value: PortfolioType[];
}
export const UploadAvatar = ({ onChange, value, ...props }: UploadAvatarType) => {
 const [onChangeImgTest, setOnChangeImgTest] = useState<Blob | null>(null);
 const [setAvatar, { data, isLoading }] = useChangeAvatarMutation();

 const filePicker = useRef<HTMLInputElement | null>(null);
 const formDataImg = new FormData();

 const handlePickerRef = () => {
  if (filePicker.current) {
   filePicker.current.click();
  }
 };
 const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType>({
  open: false,
  text: "",
  severity: "warning",
 });

 const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0].size / 1024 / 1024 <= 1) {
   e.target.files && setOnChangeImgTest(e.target.files[0]);

   formDataImg.append("file", e.target.files[0], e.target.files[0].name.replace(/ /g, ""));
   onChange(formDataImg);
  } else {
   setOpenSnackbar({
    open: true,
    text: "Размер файла не более 1 мб",
    severity: "error",
   });
  }
 };

 const clearPhoto = () => {
  //const profileId = JSON.parse(getJsonParseLocalStorage()).id;
  const formDataImg = new FormData();
  setOnChangeImgTest(null);
  data && formDataImg.append("removeFilesUrl", data.uri);

  //setAvatar({
  // formDataImg,
  // profileId,
  //}).unwrap();
 };

 return (
  <div className={s.uploadPhoto}>
   <div className={s.up1}>
    {onChangeImgTest && (
     <div className={s.imgCards}>
      <img src={URL.createObjectURL(onChangeImgTest)} alt="img" className={s.photo} />

      <img onClick={clearPhoto} className={s.clearImgButton} src={clearIcon} alt="clear" />
     </div>
    )}
   </div>

   <p onClick={handlePickerRef}>Загрузить фотографию</p>
   <input
    onChange={setPhoto}
    {...props}
    type="file"
    ref={(e) => {
     filePicker.current = e;
    }}
   />

   {openSnackbar.open && (
    <SnackbarGlobal
     text={openSnackbar.text}
     open={openSnackbar.open}
     setOpen={setOpenSnackbar}
     severity={openSnackbar.severity}
    />
   )}

   <span>Размер файла не более 1 мб</span>
  </div>
 );
};
