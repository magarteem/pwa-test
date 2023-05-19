import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { optionСategoryBD } from "./service/optionСategoryBD";
import s from "./style/addNewNewsForm.module.scss";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AddImageIcons } from "../../assets/icons/addImageIcons.svg";
import clearIcon from "../../assets/icons/clearIcon.svg";
import { ButtonSubmitMui } from "../../common/mui-element/ButtonSubmitMui";
import { CustomButtomAddImg } from "../../common/components/timeLine/customButtomAddImg/CustomButtomAddImg";
import { CityResultsType } from "../../types/PROFILE/cityGlobalType";
import { SelectTypeNews } from "../../common/mui-element/typeNews/SelectTypeNews";

interface ChangeNewNewsFormType {
 changeDataNews: any;
}

export const ChangeThisNewsForm = ({ changeDataNews }: ChangeNewNewsFormType) => {
 const navigate = useNavigate();

 const { timeLinePost, author, date, id } = changeDataNews;

 const {
  watch,
  control,
  register,
  handleSubmit,
  setValue,
  formState: { errors, isValid },
 } = useForm<any>({
  mode: "onBlur",
  defaultValues: {
   genre: timeLinePost.genre,
   tools: timeLinePost.tools || [],
   photo: timeLinePost.photo,
   text: timeLinePost.text,
   typeCategory: timeLinePost.typeCategory,
   city: timeLinePost.city || {},
  },
 });

 const onSubmit = (data: any) => {
  //myProfile &&
  //  dispatch(
  //    updateDataTimeLineThunk({
  //      date,
  //      id,
  //      timeLinePost: {
  //        ...data,
  //        genre: data.genre,
  //        tools: data.tools,
  //        photo: data.photo,
  //        text: data.text,
  //        typeCategory: data.typeCategory,
  //        city: data.city,
  //      },
  //      author,
  //    })
  //  );
  navigate(-1);
 };

 const clearPhoto = () => {
  setValue("photo", [""]);
 };

 return (
  <form noValidate onSubmit={handleSubmit(onSubmit)} className={s.formWrapCreateNews}>
   <section className={s.textFields}>
    <div className={s.styleInput}>
     <Controller
      name="text"
      control={control}
      render={({ field: { onChange, value, ref, ...field } }) => (
       <div className={s.sizeInput}>
        <TextField
         value={value}
         multiline
         sx={styleTextAreaSX}
         fullWidth
         autoComplete="off"
         placeholder="Чем вы хотите поделиться?"
         variant="outlined"
         onChange={onChange}
        />
       </div>
      )}
     />
    </div>

    <div className={s.imgWrap}>
     {/*<img src={cardsItem_1} alt={cardsItem_1} /> // img удалена*/}
     <img onClick={clearPhoto} className={s.clearImgButton} src={clearIcon} alt="clear" />
    </div>
   </section>

   <section className={s.selectParams}>
    {/*<div className={s.selectFieldCustomHeight}>
     <Controller
      name="genre"
      control={control}
      render={({ field: { onChange, value, ref, ...field } }) => (
       <SelectGenreElementMui
        ItemRef={ref}
        value={value}
        placeholder="Жанр"
        options={genreBD}
        onChange={onChange}
        errors={errors.genre}
        {...field}
       />
      )}
     />
    </div>*/}

    {/*<div className={cn(s.selectFieldCustomHeight, s.addMargin)}>
          <Controller
            name="tools"
            control={control}
            render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
              <SelectToolsElementMui
                ItemRef={ref}
                value={value}
                placeholder="Инструмент (род деятельности)"
                options={groupeOptions}
                onChange={onChange}
                errors={errors.tools}
                {...field}
              />
            )}
          />
        </div>*/}

    <div className={s.selectBlock}>
     <div className={s.selectField}>
      <SelectTypeNews
       required={true}
       control={control}
       placeholder="Тип новости"
       options={optionСategoryBD}
       name="typeCategory"
      />
     </div>

     <div className={s.selectField}>
      <SelectTypeNews
       control={control}
       placeholder="Город"
       //@ts-ignore
       options={data?.results?.map((x: CityResultsType) => {
        return {
         id: x.id,
         name: x.title,
        };
       })}
       name="city"
      />
     </div>
    </div>

    <div className={s.sendBlock}>
     <div className={cn(s.btnWrapper, s.imgSend)}>
      <Controller
       name="tools"
       control={control}
       render={({ field: { onChange, value, ref, ...field }, formState: { errors } }) => (
        <CustomButtomAddImg
         startIcon={<AddImageIcons />}
         textButton="Добавить"
         isValidInButton={!Array.isArray(watch("photo"))}
         register={register}
         onChange={onChange}
        />
       )}
      />
     </div>
     <div className={s.btnWrapper}>
      <ButtonSubmitMui textButton="Сохранить изменения" isValidInButton={!isValid} />
     </div>
    </div>
   </section>
  </form>
 );
};

export const styleTextAreaSX = {
 width: "100% !important",
 fontSize: "16px",
 fontFamily: `Mulish_Regular, sans-serif !important`,
 padding: "0",

 fieldset: {
  display: "none",
 },

 "& .MuiInputBase-root": {
  height: "auto",
  borderRadius: "8px",
  padding: "0 14px",
  color: "#43483E",
  fontFamily: `Mulish_Regular, sans-serif !important`,

  "&:focus": {
   height: "auto",
  },

  "& .MuiInputBase-input": {
   "&::-webkit-input-placeholder": {
    fontWeight: 500,
    color: "#242424",
    opacity: 1,
   },
  },
 },
};
