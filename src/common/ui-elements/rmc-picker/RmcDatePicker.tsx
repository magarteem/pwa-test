import { FilterModalLayout } from "../../layout/filterModalLayout/FilterModalLayout";
import { calculateAge } from "../../../helpers/calculateAge";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { minDate } from "./utils";
import dayjs from "dayjs";
import DatePicker from "rmc-date-picker/lib/DatePicker";
import TextFieldElementMui from "../../mui-element/textFieldElementMui/textField/TextFieldElementMui";
import "./styles.css";
import s from "./rmcPicker.module.scss";

interface RmcDatePickerType {
 placeholder: string;
 values: number;
 required?: boolean;
 errors?: any;
 min?: number;
 mode: "time" | "date";
 onChange: (num: any) => any;
}

export const RmcDatePicker = ({
 placeholder,
 values,
 required,
 errors,
 min,
 mode,
 onChange,
}: RmcDatePickerType) => {
 const [open, setOpen] = useState(false);
 const [date, setDate] = useState<any>(values);

 const handleClose = () => setOpen(false);
 const handleClickOpen = () => setOpen(true);
 const onDateChange = (date: any) => {
  setDate(date);
  onChange(date);
 };
 const resetDate = (date: any) => {
  setDate(null);
  onChange(null);
  handleClose();
 };

 const formatterValue = (dt: Date) => {
  switch (mode) {
   case "time":
    return `${dayjs(dt).format("HH : mm")}`;

   default:
    return calculateAge(dt.getTime());
  }
 };
 return (
  <>
   <div className={s.fieldPicker}>
    <div onClick={handleClickOpen} className={s.wrapperBlockInput}>
     <TextFieldElementMui
      inputValue={date ? formatterValue(date) : ""}
      placeholder={placeholder}
      required={required}
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
    <DatePicker
     defaultDate={date}
     mode={mode}
     minuteStep={5}
     maxDate={mode === "date" ? new Date() : false}
     minDate={min ? min : minDate}
     onDateChange={onDateChange}
    />
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
