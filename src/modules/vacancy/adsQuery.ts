import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { AxiosResponse } from "axios";
import queryString from "query-string";
import apiProfile from "../../api/axiosConfigPROFILE";
import { doneParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import {
  RequestAdsType,
  RequestVacancyType,
} from "../ads/types/requestAdsType";
import {
  ResponseAdsType,
  ResultAdsTypeResponse,
} from "../ads/types/responseAdsType";
import {
  AdsFilterParamsRequestType,
  VacancyFilterParamsRequestType,
} from "./types/FilterFormsAdsFieldsType";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";

export const adsQuery = createApi({
  reducerPath: "adsQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL_PROFILE}`,
    prepareHeaders: async (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem(`auth-token`)}`
      );
      headers.set("accept", `application/json`);
      headers.set("form_id", doneParseLocalStorage.id);
      return headers;
    },
  }),
  keepUnusedDataFor: 60 * 60,

  endpoints: (build) => ({
    listVacancy: build.query<
      ResponseAdsType,
      VacancyFilterParamsRequestType | void | null
    >({
      query: (arg) => {
        const params = {
          page: arg?.page || 0,
          pageSize: 10,
          query: arg?.query || undefined,
          formId: arg?.formId,
          vacancyOwnerFormType: arg?.vacancyOwnerFormType,
          searchVacancyDocumentType: arg?.searchVacancyDocumentType,
          institutionTypeId: arg?.institutionTypeId,
          cityIds: arg?.cityIds ?? undefined,
          genreIds: arg?.genreIds,
          instrumentIds: arg?.instrumentIds,
        };

        return {
          url: `vacancy/search?${queryString.stringify(params)}`,
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
        return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
      },
    }),
    listAds: build.query<
      ResponseAdsType,
      AdsFilterParamsRequestType | void | null
    >({
      query: (arg) => {
        const params = {
          page: arg?.page || 0,
          pageSize: 10,
          searchAnnouncementDocumentType: arg?.searchAnnouncementDocumentType,
          cityIds: arg?.cityIds ?? undefined,
          genreIds: arg?.genreIds,
          instrumentIds: arg?.instrumentIds,
          query: arg?.query || undefined,
          formId: arg?.formId,
        };

        return {
          url: `announcement/search?${queryString.stringify(params)}`,
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
        return rulesQueryInfiniteScroll(previousArg, currentArg, endpointState);
      },
    }),

    sendVacancyPost: build.mutation<string, RequestVacancyType>({
      query: (arg) => ({
        url: `vacancy`,
        method: "POST",
        body: arg,
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: createData } = await queryFulfilled;
          //@ts-ignore
          apiProfile(`vacancy/${createData.id}`).then(
            (res: AxiosResponse<ResultAdsTypeResponse>) => {
              dispatch(
                adsQuery.util.updateQueryData(
                  "listVacancy",
                  //@ts-ignore
                  res,
                  (draft: ResponseAdsType) => {
                    draft.results?.unshift(res.data);
                  }
                )
              );
            }
          );
        } catch {
          console.log("error vel");
        }
      },
    }),

    sendAdsPost: build.mutation<string, RequestAdsType>({
      query: (arg) => ({
        url: `announcement`,
        method: "POST",
        body: arg,
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: createData } = await queryFulfilled;
          //@ts-ignore
          apiProfile(`announcement/${createData.id}`).then(
            (res: AxiosResponse<ResultAdsTypeResponse>) => {
              dispatch(
                adsQuery.util.updateQueryData(
                  "listAds",
                  //@ts-ignore
                  res,
                  (draft: ResponseAdsType) => {
                    draft.results?.unshift(res.data);
                  }
                )
              );
            }
          );
        } catch {
          console.log("error vel");
        }
      },
    }),

    updateThisVacancyPost: build.mutation<
      string,
      { data: RequestVacancyType; change_id_ads: string }
    >({
      query: ({ data, change_id_ads }) => {
        return {
          url: `vacancy/${change_id_ads}`,
          method: "PUT",
          body: data,
        };
      },

      async onQueryStarted(m, { dispatch, queryFulfilled }) {
        try {
          const { data: createData } = await queryFulfilled;
          apiProfile(
            //@ts-ignore
            `vacancy/${createData.id}`
          ).then((res: AxiosResponse<ResultAdsTypeResponse>) => {
            dispatch(
              adsQuery.util.updateQueryData(
                "listVacancy",
                undefined,
                (draft: ResponseAdsType) => {
                  draft.results = draft.results?.map((x) => {
                    if (x.id === m.change_id_ads) {
                      return res.data;
                    } else {
                      return x;
                    }
                  });
                }
              )
            );
          });
        } catch {
          console.log("Error");
        }
      },
    }),
    updateThisAdsPost: build.mutation<
      string,
      { data: RequestAdsType; change_id_ads: string }
    >({
      query: ({ data, change_id_ads }) => ({
        url: `announcement/${change_id_ads}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted(m, { dispatch, queryFulfilled }) {
        try {
          const { data: createData } = await queryFulfilled;
          apiProfile(
            //@ts-ignore
            `announcement/${createData.id}`
          ).then((res: AxiosResponse<ResultAdsTypeResponse>) => {
            dispatch(
              adsQuery.util.updateQueryData(
                "listAds",
                undefined,
                (draft: ResponseAdsType) => {
                  console.log(draft);
                  const n = draft.results?.map((x) => {
                    if (x.id === m.change_id_ads) {
                      return res.data;
                    } else {
                      return x;
                    }
                  });
                  draft.results = n;
                }
              )
            );
          });
        } catch {
          console.log("Error");
        }
      },
    }),

    oneAnnouncementPost: build.query<ResultAdsTypeResponse, string>({
      query: (id_ads) => {
        return {
          url: `announcement/${id_ads}`,
          params: {
            requestFormId: doneParseLocalStorage.id,
          },
        };
      },
    }),
    oneVacancyPost: build.query<ResultAdsTypeResponse, string>({
      query: (id_ads) => {
        return {
          url: `vacancy/${id_ads}`,
          params: {
            requestFormId: doneParseLocalStorage.id,
          },
        };
      },
    }),


    deleteVacancy: build.mutation<void, string>({
      query: (string) => ({
        url: `vacancy/archive/${string}`,
        method: "PUT",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            adsQuery.util.updateQueryData(
              "listVacancy",
              undefined,
              (draft: ResponseAdsType) => {
                let r = draft.results?.filter((x) => x.id !== id);
                return { ...draft, results: r };
              }
            )
          );
        } catch {
          console.log("Error");
        }
      },
    }),

    deleteAds: build.mutation<void, string>({
      query: (string) => ({
        url: `announcement/archive/${string}`,
        method: "PUT",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            adsQuery.util.updateQueryData(
              "listAds",
              undefined,
              (draft: ResponseAdsType) => {
                let r = draft.results?.filter((x) => x.id !== id);
                return { ...draft, results: r };
              }
            )
          );
        } catch {
          console.log("Error ");
        }
      },
    }),
  }),
});

export const {
  useListAdsQuery,
  useListVacancyQuery,
  useSendVacancyPostMutation,
  useSendAdsPostMutation,
  useOneAnnouncementPostQuery,
  useOneVacancyPostQuery,
  useDeleteVacancyMutation,
  useDeleteAdsMutation,
  useUpdateThisVacancyPostMutation,
  useUpdateThisAdsPostMutation,
} = adsQuery;
