import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ButtonSubmitMui } from "../../common/mui-element/ButtonSubmitMui";
import { IconButton } from "@mui/material";
import {
 FilterFormsTimeLineFieldsType,
 FilterParamsRequestType,
} from "./types/FilterFormsTimeLineFieldsType";
import { FilterLayoutWrapper } from "../../common/layout/filterLayoutWraper/FilterLayoutWrapper";
import { ControllerTextField } from "../../common/hookFormControllers/ControllerTextField";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllerTypeNews } from "../../common/hookFormControllers/ControllerTypeNews";
import { getNewsListQuery } from "./getNewsListQuery";
import { useAppDispatch } from "../../core/redux/app/hooks";
import { useOutletContext } from "react-router";
import s from "./style/filterFormsTimline.module.scss";

interface FilterFormsTimeLineType {
 filerstate: FilterFormsTimeLineFieldsType;
 defaultFilter: FilterFormsTimeLineFieldsType;
 handleClose: () => void;
 setFilterStateFu: (data: any) => void;
}

interface OutletType {
 setPageFu: (paramsQuery?: FilterParamsRequestType) => void;
}

export const FilterFormsTimeLine = ({
 filerstate,
 defaultFilter,
 handleClose,
 setFilterStateFu,
}: FilterFormsTimeLineType) => {
 const dispatch = useAppDispatch();
 const { setPageFu }: OutletType = useOutletContext();

 const { control, handleSubmit, reset, setValue, watch } = useForm<FilterFormsTimeLineFieldsType>({
  mode: "onBlur",
  defaultValues: filerstate,
 });

 const resetFormFields = () => reset(defaultFilter);

 const onSubmit = (data: FilterFormsTimeLineFieldsType) => {
  const paramsQuery = {
   page: 0,
   query: !!data.search_text ? data.search_text : undefined,
   type: data.type_category?.id,
   cityIds: data.city?.id,
   genreIds: data.genre.map((x) => x.id),
   instrumentIds: data.tools.map((x) => x.id),
  };
  handleClose();
  dispatch(getNewsListQuery.util.resetApiState());
  setPageFu(paramsQuery);
 };

 useEffect(() => {
  const subscription = watch((value, { name, type }) => {
   setFilterStateFu(value);
  });
  return () => subscription.unsubscribe();
 }, [watch]);

 return (
  <FilterLayoutWrapper handleClose={handleClose}>
   <form noValidate onSubmit={handleSubmit(onSubmit)}>
    <div className={s.headerForms}>
     <h1>Фильтр</h1>
     <IconButton
      onClick={resetFormFields}
      sx={{
       borderRadius: "10px",
       padding: "13px",
      }}
     >
      <h5>Очистить</h5>
     </IconButton>
    </div>

    <div className={s.gawField}>
     <ControllerTextField
      control={control}
      name="search_text"
      required={false}
      placeholder="Поиск по содержимому"
     />
     <ControllerTypeNews control={control} name="type_category" placeholder="Тип новости" />
     <ControllersCityAsync
      name="city"
      placeholder="Город"
      control={control}
      required={false}
      setValue={setValue}
     />

     <ControllerToolsAsync
      control={control}
      placeholder="Инструмент (род деятельности)"
      name="tools"
      required={false}
     />
     <ControllerGenreAsync control={control} name="genre" required={false} />
    </div>

    <div className={s.btnWrapper}>
     <ButtonSubmitMui isValidInButton={false} textButton="Показать результаты" />
    </div>
   </form>
  </FilterLayoutWrapper>
 );
};
