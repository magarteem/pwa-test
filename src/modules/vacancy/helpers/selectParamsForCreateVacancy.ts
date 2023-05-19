import { EnumTypeDocumentType } from "../../../types/PROFILE/enum/EnumTypeDocumentType";
import { RequestVacancyType } from "../../ads/types/requestAdsType";
import { FormsCreatedVacancyType } from "../types/typeFormsCreatedAds";

export const selectParamsForCreateVacancy = (
 data: FormsCreatedVacancyType,
 idMyActiveForms: string
): RequestVacancyType => {
 const tempContact = [
  { contactType: "phone", value: data.phone },
  { contactType: "email", value: data.email },
  { contactType: "web-site", value: data.web_site },
 ];

 const conditions = {
  salary: data.payment,
  employmentType: data.workingConditions?.id || "None",
  scheduleDescription: data.commitAbout,
 };

 const paramsMain = {
  formId: idMyActiveForms,
  title: `
   Требуется ${data.required?.name.toLowerCase()}`,
  cityId: data.city?.id,
  experience: data.work_experience,
  contacts: tempContact.filter((x) => {
   return !!x.value;
  }),
  genreIds: data.genre.map((x) => x.id),
  instrumentIds: data.tool.map((x) => x.id),
  description: data.commit,
 };

 switch (data.required?.id) {
  case EnumTypeDocumentType.MUSICIAN: {
   const musicianAnnouncementDocument = {
    gender: data.gender?.id || "Undefined",
    ageRange:
     data.fromAge && data.toAge
      ? {
         start: data.fromAge,
         finish: data.toAge,
        }
      : null,
    skills: data.master ? [data.master.id] : ["Undefined"],
    education: "",
    cooperationTerms: "",
   };
   return {
    ...paramsMain,
    conditions,
    musicianAnnouncementDocument,
    teamAnnouncementDocument: null,
    soundProducerAnnouncementDocument: null,
   };
  }
  case EnumTypeDocumentType.TEAM: {
   const teamAnnouncementDocument = {
    teamType: data.whoAreLooking?.id || "Undefined",
    cooperationTerms: "",
   };
   return {
    ...paramsMain,
    conditions,
    teamAnnouncementDocument,
    musicianAnnouncementDocument: null,
    soundProducerAnnouncementDocument: null,
   };
  }
  //case "jobDocument":
  default:
   return {
    ...paramsMain,
    conditions,
    musicianAnnouncementDocument: null,
    teamAnnouncementDocument: null,
    soundProducerAnnouncementDocument: {
     skills: data.master ? [data.master.id] : null,
     education: "string",
     age:
      data.fromAge && data.toAge
       ? {
          start: data.fromAge,
          finish: data.toAge,
         }
       : null,
     gender: data.gender?.id || "Undefined",
    },
   };
 }
};
