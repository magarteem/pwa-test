import { useEffect, useState } from "react";
import MultiPicker from "rmc-picker/lib/MultiPicker";
import Picker from "rmc-picker/lib/Picker";
import TextFieldElementMui from "../../mui-element/textFieldElementMui/textField/TextFieldElementMui";
import { FilterModalLayout } from "../../layout/filterModalLayout/FilterModalLayout";
import "./styles.css";
import s from "./rmcPicker.module.scss";
import { IconButton } from "@mui/material";

interface RmcPickerType {
 placeholder: string;
 values: number;
 required?: boolean;
 errors?: any;
 min?: number;
 onChange: (num: any) => any;
}

export const RmcPicker = ({
 placeholder,
 values,
 required,
 errors,
 min,
 onChange,
}: RmcPickerType) => {
 const [open, setOpen] = useState(false);
 const [value, setValue] = useState(values);
 const [item, setItem] = useState<any>();

 const handleClose = () => setOpen(false);
 const changeField = (val: any) => {
  setValue(val[0]);
  onChange(val[0]);
 };

 const handleClickOpen = () => setOpen(true);
 const resetDate = (date: any) => {
  setValue(0);
  onChange(null);
  handleClose();
 };

 const getItems = (st: number) => {
  const items: any[] = [];

  for (let i = st; i < 101; i++) {
   items.push(
    <Picker.Item value={i} key={i}>
     {i}
    </Picker.Item>
   );
  }
  setItem(items);
 };

 useEffect(() => {
  getItems(0);
 }, []);

 useEffect(() => {
  min && getItems(min);
 }, [min]);

 return (
  <>
   <div className={s.fieldPicker}>
    <div onClick={handleClickOpen} className={s.wrapperBlockInput}>
     <TextFieldElementMui
      inputValue={value ? value : ""}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      errors={errors}
      disabled={true}
     />
    </div>
   </div>

   <FilterModalLayout
    style={{
     "& .MuiDialog-container": {
      alignItems: "flex-end",
      overscrollBehavior: "contain",

      "& .MuiPaper-root": {
       background: "#FDFDF5",
       borderRadius: "28px 28px 0px 0px",
       width: "100%",
       margin: 0,
       padding: "16px",
      },
     },
    }}
    modalOpen={open}
    handleClose={handleClose}
   >
    <MultiPicker onValueChange={changeField}>
     <Picker indicatorClassName="my-picker-indicator">{item}</Picker>
    </MultiPicker>
    <IconButton
     onClick={resetDate}
     sx={{
      padding: "13px",
      color: "#2b6c00",
      borderRadius: "0",
     }}
    >
     <h5 className={s.reset}>Сбросить</h5>
    </IconButton>
   </FilterModalLayout>
  </>
 );
};
