import { useState, useEffect, useRef } from "react";
import { getJsonParseLocalStorage } from "../../../helpers/getJsonParseLocalStorage";
import { useSendPortfolioImgMutation } from "../../../modules/user/getGetMyProfileQuery";
import { PortfolioType } from "../../../types/PROFILE/accountMainGlobalType";
import { UploadImgPreview } from "./UploadImgPreview";
import { SnackbarGlobal, StateSnackbarType } from "../../mui-element/snackbar/SnackbarGlobal";
import s from "./uploadPhoto.module.scss";

interface UploadPhotoType {
 onChange: (img: any) => void;
 value: PortfolioType[];
}
export const UploadPhoto = ({ onChange, value, ...props }: UploadPhotoType) => {
 const [onChangeImgTest, setOnChangeImgTest] = useState<Array<File>>([]);
 const [stringImgSrc, setStringImgSrc] = useState<Array<string>>([]);
 const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType | null>(null);

 const filePicker = useRef<HTMLInputElement | null>(null);
 const formDataImg = new FormData();
 const profileId = JSON.parse(getJsonParseLocalStorage()).id;
 const [setData] = useSendPortfolioImgMutation();

 const handlePickerRef = () => {
  if (filePicker.current) {
   filePicker.current.click();
  }
 };

 const validateSizePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
  let size = 0;

  onChangeImgTest &&
   onChangeImgTest.forEach((s) => {
    size = size + s.size;
   });

  if (e.target.files && (size + e.target.files[0].size) / 1024 / 1024 >= 1) {
   return true;
  } else return false;
 };

 const setPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0].size / 1024 / 1024 >= 1) {
   setOpenSnackbar({
    open: true,
    text: "Размер файла не более 1 мб",
    severity: "error",
   });
  } else if (validateSizePhoto(e)) {
   setOpenSnackbar({
    open: true,
    text: "Размер добавленных файлов более 1 мб",
    severity: "error",
   });
  } else if (e.target.files) {
   setOnChangeImgTest([...onChangeImgTest, e.target.files[0]]);
   formDataImg.append("files", e.target.files[0], `${e.target.files[0].name}`);

   onChangeImgTest.forEach((x, index) => {
    formDataImg.append("files", x, `${index}`);
   });

   onChange(formDataImg);
  }
 };

 const clearPhoto = (index: number) => {
  let filter = onChangeImgTest.filter((x, ind) => ind !== index);
  const formDataImg = new FormData();
  setOnChangeImgTest(filter);
  filter.forEach((x, index) => {
   formDataImg.append("files", x, `${index}`);
  });
  onChange(formDataImg);
 };

 const clearPhotoStringSrc = (index: number) => {
  const filter = stringImgSrc.filter((x, ind) => ind !== index);
  const formDataImg = new FormData();
  formDataImg.append("removeFilesUrl", stringImgSrc[index]);
  setData({
   formDataImg,
   profileId,
  })
   .unwrap()
   .then(() => setStringImgSrc(filter)) // then and catch одинаков = особенность api
   .catch(() => setStringImgSrc(filter));
 };

 useEffect(() => {
  value?.map && setStringImgSrc(value?.map((x) => x.uri));
 }, []);

 return (
  <div className={s.uploadPhoto}>
   <div className={s.up1}>
    {onChangeImgTest.map((x, index) => {
     return <UploadImgPreview key={index} x={x} index={index} clearPhoto={clearPhoto} />;
    })}
    {stringImgSrc.map((x, index) => {
     return <UploadImgPreview key={index} x={x} index={index} clearPhoto={clearPhotoStringSrc} />;
    })}
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
   {openSnackbar && (
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
