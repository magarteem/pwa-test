import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { doneParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { ResponseIncomingType, ResponseOutgoingType } from "./types/responseNotificationType";
import { getMyProfileQuery } from "../user/getGetMyProfileQuery";
import { ResponseSearchAllFormsType } from "../user/types/responseSearchAllForms";
import { EnumContactRequestStatusResponse } from "../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { rulesQueryInfiniteScroll } from "../../helpers/rulesQueryInfiniteScroll";

export const notificationQuery = createApi({
 reducerPath: "notificationQuery",
 baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL_PROFILE}`,
  prepareHeaders: async (headers) => {
   headers.set("authorization", `Bearer ${localStorage.getItem(`auth-token`)}`);
   headers.set("accept", `application/json`);
   headers.set("form_id", doneParseLocalStorage.id);
   return headers;
  },
 }),

 endpoints: (build) => ({
  listOutgoing: build.query<ResponseOutgoingType, { page: number } | void>({
   query: (outgoingPage) => {
    return {
     url: `notification/outgoing?page=${outgoingPage?.page}&pageSize=8`,
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
    return (
     currentArg !== previousArg && rulesQueryInfiniteScroll(previousArg, currentArg, endpointState)
    );
   },
  }),
  listIncoming: build.query<ResponseIncomingType, { page: number } | void>({
   query: (incomingPage) => ({
    url: `notification/incoming?page=${incomingPage?.page}&pageSize=8`,
   }),
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

  //! Vacancy =  send \ accept \ decline
  sendVacancyReply: build.mutation<ResponseOutgoingType, { idPost: string; idMyForm: string }>({
   query: ({ idMyForm, idPost }) => {
    return {
     url: `vacancy/${idPost}/send_vacancy_reply/${idMyForm}`,
     method: "POST",
    };
   },
  }),
  sendVacancyAccept: build.mutation<
   ResponseOutgoingType,
   { idPost: string; triggerFormId: string }
  >({
   query: ({ idPost, triggerFormId }) => {
    return {
     url: `vacancy/${idPost}/accept_vacancy_reply/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),
  sendVacancyDecline: build.mutation<
   ResponseOutgoingType,
   { idPost: string; triggerFormId: string }
  >({
   query: ({ idPost, triggerFormId }) => {
    return {
     url: `vacancy/${idPost}/decline_vacancy_reply/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),

  //! Announcement =  send \ accept \ decline
  sendAnnouncementReply: build.mutation<ResponseOutgoingType, { idPost: string; idMyForm: string }>(
   {
    query: ({ idMyForm, idPost }) => {
     return {
      url: `announcement/${idPost}/send_announcement_reply/${idMyForm}`,
      method: "POST",
     };
    },
   }
  ),
  sendAnnouncementAccept: build.mutation<
   ResponseOutgoingType,
   { idPost: string; triggerFormId: string }
  >({
   query: ({ idPost, triggerFormId }) => {
    return {
     url: `announcement/${idPost}/accept_announcement_reply/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),
  sendAnnouncementDecline: build.mutation<
   ResponseOutgoingType,
   { idPost: string; triggerFormId: string }
  >({
   query: ({ triggerFormId, idPost }) => {
    return {
     url: `announcement/${idPost}/decline_announcement_reply/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),

  //! Contact =  send \ accept \ decline
  sendContactReply: build.mutation<
   ResponseOutgoingType,
   { id_userForm: string; parseJsonId: string }
  >({
   query: ({ parseJsonId, id_userForm }) => {
    return {
     url: `form/${id_userForm}/request_contacts_by_form/${parseJsonId}`,
     method: "POST",
    };
   },

   async onQueryStarted(m, { dispatch, queryFulfilled }) {
    try {
     dispatch(
      getMyProfileQuery.util.updateQueryData(
       "listAccount",
       undefined,
       (draft: ResponseSearchAllFormsType) => {
        return {
         ...draft,
         results: draft.results.map((y) => {
          if (y.formId === m.id_userForm) {
           return { ...y, contactRequestStatus: EnumContactRequestStatusResponse.PENDING };
          } else return y;
         }),
        };
       }
      )
     );
    } catch {
     console.log("Error onQueryStarted");
    }
   },
  }),
  sendContactAccept: build.mutation<
   ResponseOutgoingType,
   { requestedFormId: string; triggerFormId: string }
  >({
   query: ({ requestedFormId, triggerFormId }) => {
    return {
     url: `form/${requestedFormId}/accept_contacts_request_by_form/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),
  sendContactDecline: build.mutation<
   ResponseOutgoingType,
   { requestedFormId: string; triggerFormId: string }
  >({
   query: ({ requestedFormId, triggerFormId }) => {
    return {
     url: `form/${requestedFormId}/decline_contacts_request_by_form/${triggerFormId}`,
     method: "PUT",
    };
   },
  }),
 }),
});

export const {
 useListOutgoingQuery,
 useListIncomingQuery,
 useSendVacancyReplyMutation,
 useSendVacancyAcceptMutation,
 useSendVacancyDeclineMutation,
 useSendAnnouncementReplyMutation,
 useSendAnnouncementAcceptMutation,
 useSendAnnouncementDeclineMutation,
 useSendContactReplyMutation,
 useSendContactAcceptMutation,
 useSendContactDeclineMutation,
} = notificationQuery;
