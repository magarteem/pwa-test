import { CityGlobalType, CityResultsType } from "../../../types/PROFILE/cityGlobalType";

export const reselect = (data: CityGlobalType) => {
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
