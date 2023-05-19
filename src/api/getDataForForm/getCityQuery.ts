import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CityGlobalType } from "../../types/PROFILE/cityGlobalType";
import { GenreGlobalType } from "../../types/PROFILE/genreGlobalType";
import { InstitutionTypeGlobalType } from "../../types/PROFILE/institutionTypeGlobalType";
import { InstrumentGlobalType } from "../../types/PROFILE/InstrumentGlobalType";
import { ParamsCityQuery } from "../../common/mui-element/SelectElementForCityAsync/type";

export const getCityQuery = createApi({
 reducerPath: "getCityQuery",
 baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL_PROFILE}`,
 }),
 endpoints: (build) => ({
  getMetroForCity: build.mutation<CityGlobalType, string>({
   query: (str) => {
    return {
     url: `city`,
     params: {
      page: 0,
      pageSize: 30,
      query: str,
     },
    };
   },
  }),
  getCityDataAsync: build.query<CityGlobalType, ParamsCityQuery>({
   query: (arg) => {
    const params = {
     page: arg?.page || 0,
     pageSize: arg?.pageSize || undefined,
     query: arg?.query || undefined,
    };

    return {
     url: "city",
     params: params,
    };
   },

   serializeQueryArgs: ({ endpointName }) => {
    return endpointName;
   },
   merge: (currentCache, newItems) => {
    currentCache.currentPage = newItems.currentPage;
    currentCache.isNextPage = newItems.isNextPage;
    currentCache.results.push(...newItems.results);
   },

   forceRefetch({ currentArg, previousArg, endpointState }) {
    const rulesQueryInfiniteScroll = (
     previousArg: ParamsCityQuery | undefined,
     currentArg: ParamsCityQuery | undefined,
     endpointState: any
    ) => {
     const notDoubleFetch = endpointState?.data;
     if (notDoubleFetch?.isNextPage && previousArg && currentArg && currentArg !== previousArg)
      return true;
     else return false;
    };

    return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
   },
  }),
  getGenreData: build.query<GenreGlobalType[], void>({
   query: (arg) => ({
    url: "genre",
   }),
  }),
  getToolData: build.query<InstrumentGlobalType[], void>({
   query: (arg) => ({
    url: "instrument",
   }),
  }),
  getInstitutionTypeData: build.query<InstitutionTypeGlobalType[], void>({
   query: () => ({
    url: "institutiontype",
   }),
  }),
 }),
});

export const {
 // useGetCityDataQuery,
 useGetCityDataAsyncQuery,
 useGetGenreDataQuery,
 useGetToolDataQuery,
 useGetInstitutionTypeDataQuery,
 useGetMetroForCityMutation,
} = getCityQuery;
