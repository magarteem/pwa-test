import { useFormContext } from "react-hook-form";
import s from "./style/createFormADS.module.scss";
import { BtnInGroupeSaveCancelMui } from "../../common/components/navigateButton/BtnInGroupeSaveCancelMui";
import { requiredVacancy, teamTypeADS, workingConditionsBD } from "./service/createVacancyBD";
import { ControllerGender } from "../../common/hookFormControllers/ControllerGender";
import { ControllerPhone } from "../../common/hookFormControllers/ControllerPhone";
import { ControllerEmail } from "../../common/hookFormControllers/ControllerEmail";
import { ControllerWebSite } from "../../common/hookFormControllers/ControllerWebSite";
import { ControllerWorkExperience } from "../../common/hookFormControllers/ControllerWorkExperience";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerMaster } from "../../common/hookFormControllers/ControllerMaster";
import { ControllerRandomSelect } from "../../common/hookFormControllers/ControllerRandomSelect";
import { ControllerTextField } from "../../common/hookFormControllers/ControllerTextField";
import { ControllerTextArea } from "../../common/hookFormControllers/ControllerTextArea";
import { useLocation } from "react-router-dom";
import { EnumTypeDocumentType } from "../../types/PROFILE/enum/EnumTypeDocumentType";
import { ControllerAgeRangeRmcPicker } from "../../common/hookFormControllers/ControllerAgeRangeRmcPicker";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";

interface CreateFormVacancyType {
 buttonSubmitText: string;
}

export const CreateFormVacancy = ({ buttonSubmitText }: CreateFormVacancyType) => {
 let location = useLocation();
 const checkChange = location.pathname.includes("change-this-ads");
 const { control, watch, setValue } = useFormContext();
 const typeVacancy = watch("required")?.id;

 const mus = typeVacancy === EnumTypeDocumentType.MUSICIAN;
 const team = typeVacancy === EnumTypeDocumentType.TEAM;
 const sound = typeVacancy === EnumTypeDocumentType.SOUND_PRODUCER;

 return (
  <>
   <ControllerRandomSelect
    control={control}
    options={requiredVacancy}
    placeholder="Требуется"
    name="required"
    required={true}
   />

   {team && (
    <ControllerRandomSelect
     control={control}
     placeholder="Вид коллектива"
     name="whoAreLooking"
     options={teamTypeADS}
    />
   )}
   {!!typeVacancy && (
    <>
     {!sound && (
      <ControllerToolsAsync
       control={control}
       placeholder={team ? "Состав" : "Инструмент (род деятельности)"}
       name="tool"
       required={team ? false : true}
      />
     )}
     <ControllerGenreAsync control={control} name="genre" required={false} />
     {!checkChange && (
      <ControllersCityAsync name="city" placeholder="Город" control={control} setValue={setValue} />
     )}

     {(mus || sound) && (
      <>
       <ControllerGender control={control} name="gender" required={false} />
       <ControllerAgeRangeRmcPicker control={control} watch={watch} />
      </>
     )}

     <div className={s.requirements}>
      <h2>Требования</h2>
     </div>

     <ControllerWorkExperience
      control={control}
      name="work_experience"
      helperText="Опишите требуемый опыт"
     />
     {(mus || sound) && <ControllerMaster control={control} name="master" />}

     <ControllerTextArea control={control} name="commit" placeholder="Требования" />

     <div className={s.requirements}>
      <h2>О работе</h2>
     </div>

     <ControllerTextField
      control={control}
      name="payment"
      placeholder="Оплата"
      helperText="Обязательное поле"
     />

     <ControllerRandomSelect
      control={control}
      options={workingConditionsBD}
      placeholder="Условия работы"
      name="workingConditions"
      required={false}
     />

     <ControllerTextArea control={control} name="commitAbout" placeholder="Описание" />

     <div className={s.requirements}>
      <h2>Контакты</h2>
     </div>

     <ControllerPhone control={control} name="phone" />
     <ControllerEmail control={control} name="email" />
     <ControllerWebSite control={control} name="web_site" />

     <div className={s.btnFormWrapper}>
      <BtnInGroupeSaveCancelMui textCancelButton="Назад" textButton={buttonSubmitText} />
     </div>
    </>
   )}
  </>
 );
};
