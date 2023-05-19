// fix LIB
// https://codesandbox.io/embed/magical-dhawan-d1w57?file=/index.js&codemirror=1
// https://github.com/mui/material-ui/issues/30249

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCityQuery, useGetCityDataAsyncQuery } from "../../../api/getDataForForm/getCityQuery";
import { styleTextFieldSX } from "./styleTextFieldSX";
import { useDebounce } from "../../../hook/useDebiunce";
import { ParamsCityQuery, SelectElementForCityAsyncType } from "./type";
import { reselect } from "./reselect";
import { ListBox } from "./ListBox";
import { useAppDispatch } from "../../../core/redux/app/hooks";
import { CityGlobalType } from "../../../types/PROFILE/cityGlobalType";

const defaultQuery = { page: 0, query: "" };

export const SelectElementForCityAsync = ({
 required = true,
 helperText = "",
 errors,
 inputValue,
 placeholder,
 onChange,
 setValue,
 ...props
}: SelectElementForCityAsyncType) => {
 const dispatch = useAppDispatch();
 const [query, setQuery] = useState<ParamsCityQuery>(defaultQuery);
 const debouncedValue = useDebounce<ParamsCityQuery>(query, 500);
 const [open, setOpen] = useState(false);

 const { data, isLoading, isFetching } = useGetCityDataAsyncQuery(debouncedValue);
 const loading = isLoading || isFetching;

 useEffect(() => {
  let active = true;
  if (!loading) return undefined;

  return () => {
   active = false;
  };
 }, [loading]);

 // useEffect(() => {
 //if (!open) setQuery(defaultQuery);
 // }, [open]);

 const asyncFu = async (str: string) => {
  dispatch(
   getCityQuery.util.updateQueryData("getCityDataAsync", defaultQuery, (draft: CityGlobalType) => {
    return { ...draft, isNextPage: true, results: [], currentPage: 0 };
   })
  );

  setQuery({
   query: str,
   page: 0,
   pageSize: 20,
  });
 };

 const loadMoreResults = () => {
  data &&
   setQuery({
    ...query,
    page: data ? data.currentPage + 1 : 0,
    pageSize: 20,
   });
 };

 const handleScroll = (event: any) => {
  const listboxNode = event.currentTarget;

  const position = listboxNode.scrollTop + listboxNode.clientHeight;
  if (listboxNode.scrollHeight - position <= 1) {
   loadMoreResults();
  }
 };

 return (
  <Autocomplete
   openOnFocus
   options={data ? reselect(data) : []}
   getOptionLabel={(option) => (option.name ? option.name : "")}
   ListboxProps={{
    onScroll: handleScroll,
   }}
   ListboxComponent={ListBox}
   loadingText="Поиск..."
   noOptionsText="Нет результатов"
   onChange={(e, data: any) => {
    setValue("metroId", null);
    return onChange(data);
   }}
   fullWidth
   id="asynchronous-demo"
   open={open}
   onOpen={() => {
    setOpen(true);
   }}
   onClose={() => {
    setOpen(false);
   }}
   value={!!inputValue ? inputValue : null}
   isOptionEqualToValue={(option, value) => option.id === value.id}
   loading={loading}
   renderOption={(props: object, option: any, state: object) => <div {...props}>{option.name}</div>}
   renderInput={(params) => (
    <TextField
     onChange={(e) => asyncFu(e.currentTarget.value)}
     helperText={errors && errors.message}
     required={required}
     error={errors}
     sx={styleTextFieldSX.input}
     label={placeholder}
     {...params}
     InputProps={{
      ...params.InputProps,
      endAdornment: (
       <React.Fragment>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
       </React.Fragment>
      ),
     }}
    />
   )}
   {...props}
  />
 );
};
