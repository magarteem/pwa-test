import { InterfaceGlobalSelectTypeCity } from "../../../modules/user/types/userSliceType";
import { ChangeEvent } from "react";

export interface ParamsCityQuery {
 query: string;
 page: number;
 pageSize?: number;
}

export interface SelectElementForCityAsyncType {
 required?: boolean;
 helperText?: string;
 errors?: any;
 inputValue?: InterfaceGlobalSelectTypeCity;
 placeholder: string;
 onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 setValue?: any;
}
