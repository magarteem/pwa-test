import { ResponseGlobalType } from "../../api/types/ResponseGlobalType";

//interface MetroObjType {
//  color: string | null;
//  id: string;
//  title: string;
// }
// export type MetroType = MetroObjType[] | [];

export interface CityResultsType {
 id: number;
 title: string;
 countryTitle: string | null;
 regionTitle: string | null;
 important: boolean;
 metros?: [];
}

export interface CityGlobalType extends ResponseGlobalType {
 results: CityResultsType[];
}
