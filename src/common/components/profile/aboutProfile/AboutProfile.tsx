import { Link, useParams } from "react-router-dom";
import { InitialStateUserType } from "../../../../modules/user/types/userSliceType";
import { BtnUserContact } from "./skills/BtnUserContact";
import { SkillsLayoutMaster } from "./skills/SkillsLayoutMaster";
import { SkillsLayoutGenre } from "./skills/SkillsLayoutGenre";
import { SkillsLayoutTools } from "./skills/SkillsLayoutTools";
import { NameProfile } from "../nameProfile/NameProfile";
import { WorkExperienceCard } from "./skills/WorkExperienceCards";
import { RouteNames } from "../../../../core/router/RouteNames";
import { EnumTypeAccount } from "../../../../types/PROFILE/enum/EnumTypeAccount";
import { useAppSelector } from "../../../../core/redux/app/hooks";
import { Portfolio } from "./portfolio/Portfolio";
import { About } from "./about/About";
import { Contacts } from "./contacts/Contacts";
import { EnumPrivateType } from "../../../../types/PROFILE/enum/EnumPrivateType";
import { EnumContactRequestStatusResponse } from "../../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import s from "./aboutProfile.module.scss";

interface AboutProfileType {
 userDataProfile: InitialStateUserType;
}

export const AboutProfile = ({ userDataProfile }: AboutProfileType) => {
 const { isActiveForms: idMyForm, allMyForms } = useAppSelector((state) => state.userSliceReducer);
 const parseJson = idMyForm && JSON.parse(idMyForm).nameForms;
 const parseJsonId = idMyForm && JSON.parse(idMyForm).id;

 const { id_user } = useParams();
 const {
  skills: { education, genre, inspiration, master, tool, workExperience },
  id_user: id_userForm,
  age,
  city,
  email,
  name,
  phone,
  portfolio_photo,
  webSite,
  from_opening_hours,
  to_opening_hours,
  metroId,
  address,
  area,
  type_collective,
  institutionType,
  schedule,
  private_settings,
  privateType,
  contactRequestStatus,
 } = userDataProfile;

 const watchMisician = parseJson === EnumTypeAccount.MUSICIAN;
 const watchTeam = parseJson === EnumTypeAccount.TEAM;
 const watchSoundProduser = parseJson === EnumTypeAccount.SOUND_PRODUCER;

 return (
  <>
   <section className={s.main}>
    <NameProfile
     age={age || 0}
     name={name}
     city={city?.name}
     merto={metroId}
     address={address}
     type_collective={type_collective?.name || institutionType?.name}
    />

    {id_user &&
     (privateType === EnumPrivateType.HIDE_CONTACTS || privateType === EnumPrivateType.HIDE_ALL) &&
     contactRequestStatus !== EnumContactRequestStatusResponse.MY_FORM && (
      <div className={s.noBorder}>
       <BtnUserContact
        contactRequestStatus={contactRequestStatus}
        id_userForm={id_userForm}
        parseJsonId={parseJsonId}
        privateType={privateType}
       />
      </div>
     )}

    <div className={s.linkPublicationsMusician}>
     <Link
      to={
       id_user
        ? RouteNames.OTHER_USER_POSTS
        : `${RouteNames.OTHER_PROFILE_USER}/${parseJsonId}/${RouteNames.OTHER_USER_POSTS}`
      }
     >
      {contactRequestStatus === EnumContactRequestStatusResponse.MY_FORM || !id_user
       ? "Мои публикации"
       : "Публикации пользователя"}
     </Link>
    </div>

    {tool.length > 0 && (
     <SkillsLayoutTools
      skillsDataItem={tool}
      skillsCategoryTitle={watchMisician ? "Инструменты" : "Состав"}
     />
    )}

    {genre.length > 0 && <SkillsLayoutGenre skillsDataItem={genre} skillsCategoryTitle="Жанр" />}
    {master && <SkillsLayoutMaster skillsDataItem={master} skillsCategoryTitle="Мастерство" />}

    {!!workExperience && (
     <WorkExperienceCard workExperience={workExperience} skillsCategoryTitle="Опыт работы" />
    )}

    {!!education && (
     <WorkExperienceCard workExperience={education} skillsCategoryTitle="Образование" />
    )}

    {!watchMisician && !watchTeam && (!!schedule?.Friday || !!inspiration || !!area) && (
     <About
      schedule={schedule}
      watchMisician={watchMisician}
      watchTeam={watchTeam}
      inspiration={inspiration}
      area={area}
     />
    )}

    {(portfolio_photo || inspiration) && (
     <Portfolio
      portfolio_photo={portfolio_photo}
      inspiration={inspiration}
      watchMisician={watchMisician}
      watchTeam={watchTeam}
     />
    )}

    {(phone || email || webSite) && <Contacts phone={phone} email={email} webSite={webSite} />}
   </section>
  </>
 );
};
