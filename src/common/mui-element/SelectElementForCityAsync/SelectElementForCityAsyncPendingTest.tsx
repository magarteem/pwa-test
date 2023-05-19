import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, {
 ChangeEvent,
 useEffect,
 useState,
 forwardRef,
 useRef,
 ForwardedRef,
 useImperativeHandle,
} from "react";
import { useGetCityDataAsyncQuery } from "../../../api/getDataForForm/getCityQuery";
import { InterfaceGlobalSelectTypeCity } from "../../../modules/user/types/userSliceType";
import { CityResultsType, CityGlobalType } from "../../../types/PROFILE/cityGlobalType";
import { styleTextFieldSX } from "./styleTextFieldSX";
import { useDebounce } from "../../../hook/useDebiunce";

const reselect = (data: CityGlobalType) => {
 const dataResult = data.results.map((x: CityResultsType) => {
  const stringCity = `${x.title}${x.regionTitle ? ", " + x.regionTitle : ""}${
   x.countryTitle ? ", " + x.countryTitle : ""
  }`;

  return {
   id: x.id,
   name: stringCity,
   metros: x.metros?.length !== 0 ? x.metros : null,
  };
 });

 return dataResult;
};

export interface ParamsCityQuery {
 query: string;
 page: number;
 pageSize?: number;
}

interface SelectElementForCityAsyncPendingTestType {
 required?: boolean;
 helperText?: string;
 errors?: any;
 inputValue?: InterfaceGlobalSelectTypeCity;
 placeholder: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 setValue?: any;
}

export default function SelectElementForCityAsyncPendingTestPendingTest({
 required = true,
 helperText = "",
 errors,
 inputValue,
 placeholder,
 onChange,
 setValue,
 ...props
}: SelectElementForCityAsyncPendingTestType) {
 const listBoxRef = useRef<HTMLDivElement | null>(null);
 const [query, setQuery] = useState<ParamsCityQuery>({ page: 0, query: "" });
 const debouncedValue = useDebounce<ParamsCityQuery>(query, 500);

 const { data, isLoading, isFetching } = useGetCityDataAsyncQuery(debouncedValue);

 useEffect(() => {
  //data && setOptions([...reselect(data)]);
  data && setOptions([...options, ...reselect(data)]);
 }, [data]);

 const [open, setOpen] = useState(false);
 const [options, setOptions] = useState<InterfaceGlobalSelectTypeCity[]>(
  data ? reselect(data) : []
 );

 const loading = isLoading || isFetching;
 // const loading = (open && options.length === 0) || isLoading;

 useEffect(() => {
  let active = true;
  if (!loading) return undefined;

  (async () => {
   if (active) data && setOptions(reselect(data));
  })();

  return () => {
   active = false;
  };
 }, [loading]);

 useEffect(() => {
  if (!open) setQuery({ page: 0, query: "" });
 }, [open]);

 const asyncFu = async (str: string) => {
  setOptions([]);
  setQuery({
   query: str,
   page: 0,
   pageSize: 20,
  });
 };

 const loadMoreResults = () => {
  !!query.query &&
   setQuery({
    ...query,
    page: query.page + 1,
    pageSize: 20,
   });
 };

 return (
  <Autocomplete
   ListboxProps={{
    onScroll: (event: React.SyntheticEvent) => {
     const listboxNode = event.currentTarget;
     if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
      loadMoreResults();
     }
    },
   }}
   // ListboxComponent={(listboxProps) => (
   //  <ListboxComponent listBoxRef={listBoxRef} listboxProps={listboxProps} />
   // )}
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
   getOptionLabel={(option) => (option.name ? option.name : "")}
   options={options}
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
}

interface ListBoxProps extends React.HTMLAttributes<HTMLUListElement> {}
type NullableUlElement = HTMLUListElement | null;
const ListBox = forwardRef(function ListBoxBase(
 props: ListBoxProps,
 ref: ForwardedRef<HTMLUListElement>
) {
 const { children, ...rest } = props;
 const innerRef = useRef<HTMLUListElement>(null);
 useImperativeHandle<NullableUlElement, NullableUlElement>(ref, () => {
  return innerRef.current;
 });

 return (
  <ul {...rest} ref={innerRef} role="list-box">
   {children}
  </ul>
 );
});

//interface ListBoxProps extends React.HTMLAttributes<HTMLUListElement> {}
//type NullableUlElement = HTMLUListElement | null;
//const ListBox = forwardRef(function ListBoxBase(
// props: ListBoxProps,
// ref: ForwardedRef<HTMLUListElement>
//) {
// const { children, ...rest } = props;
// const innerRef = useRef<HTMLUListElement>(null);
// useImperativeHandle<NullableUlElement, NullableUlElement>(ref, () => innerRef.current);

// return (
//  <ul {...rest} ref={innerRef} role="list-box">
//   {children}
//  </ul>
// );
//});

//
//const ListboxComponent = ({ listBoxRef, listboxProps }: any) => {
// useEffect(() => {
//  console.log(listBoxRef.current.getBoundingClientRect());
// }, []);

// return (
//  <ul
//   role="list-box"
//   ref={listBoxRef}
//   {...listboxProps}
//   // onScroll={({ target }) =>
//   //  setIsScrollBottom(target.scrollHeight - target.scrollTop === target.clientHeight)
//   // }
//  />
// );
//};

// useLayoutEffect(() => {
//  console.log(listBoxRef.current.getBoundingClientRect());
//  console.log(listBoxRef.current);
// }, []);
// return (
//  <ul
//   ref={listBoxRef}
//   {...rest}
//   // onScroll={({ target }) =>
//   //  setIsScrollBottom(target.scrollHeight - target.scrollTop === target.clientHeight)
//   // }
//  />
// );
//});
