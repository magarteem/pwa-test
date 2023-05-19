import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../core/redux/app/hooks";
import { ISignUpFormValues } from "../authorization/types/authType";
import {
  ChangeProfileFormValues,
  InitialStateUserType,
  ProfileDataApiDataType,
} from "./types/userSliceType";
import { useNavigate } from "react-router-dom";
import { BtnInGroupeSaveCancelMui } from "../../common/components/navigateButton/BtnInGroupeSaveCancelMui";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllerGender } from "../../common/hookFormControllers/ControllerGender";
import { putUpdateMyFormAccountData } from "./helpers/putUpdateMyFormAccountData";
import { updateDataMyFormTypeAccountThunk } from "./updateDataMyFormTypeAccountThunk";
import { ControllerTypeCollective } from "../../common/hookFormControllers/ControllerTypeCollective";
import { teamTypeADS } from "../vacancy/service/createVacancyBD";
import { getJsonParseLocalStorage } from "../../helpers/getJsonParseLocalStorage";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import { ControllerUploadPortfolio } from "../../common/hookFormControllers/controllerUploadPortfolio/ControllerUploadPortfolio";
import { TitleTagH } from "../../common/components/profile/titleTagH/TitleTagH";
import { ControllerPhone } from "../../common/hookFormControllers/ControllerPhone";
import { ControllerTextField } from "../../common/hookFormControllers/ControllerTextField";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerMaster } from "../../common/hookFormControllers/ControllerMaster";
import { ControllerWorkExperience } from "../../common/hookFormControllers/ControllerWorkExperience";
import { ControllerEducation } from "../../common/hookFormControllers/ControllerEducation";
import { ControllerPrivateSettings } from "../../common/hookFormControllers/ControllerPrivateSettings";
import { ControllerWebSite } from "../../common/hookFormControllers/ControllerWebSite";
import { ControllerEmail } from "../../common/hookFormControllers/ControllerEmail";
import { ControllerRoomArea } from "../../common/hookFormControllers/ControllerRoomArea";
import { ControllerTextArea } from "../../common/hookFormControllers/ControllerTextArea";
import { ControllersMetroTest } from "../../common/hookFormControllers/ControllersMetroTest";
import s from "./style/formChangeProfile.module.scss";
import { useSendPortfolioImgMutation } from "./getGetMyProfileQuery";
import {
  SnackbarGlobal,
  StateSnackbarType,
} from "../../common/mui-element/snackbar/SnackbarGlobal";
import { ControllerOpeningHoursRmcPicker } from "../../common/hookFormControllers/ControllerOpeningHoursRmcPicker";
import { ControllerAgeRmcPicker } from "../../common/hookFormControllers/ControllerAgeRmcPicker";
import { ControllersInstitutionTypeAsync } from "../../common/hookFormControllers/ControllersInstitutionTypeAsync";

interface FormChangeProfileType {
  userDataProfile: InitialStateUserType;
  userDataProfileApi?: ProfileDataApiDataType[] | any;
}
export const FormChangeProfile = ({ userDataProfile }: FormChangeProfileType) => {
  const dispatch = useAppDispatch();
  const [setData] = useSendPortfolioImgMutation();

  const [openSnackbar, setOpenSnackbar] = useState<StateSnackbarType | null>(null);

  const navigate = useNavigate();
  const typeAccount = getJsonParseLocalStorage();

  const watchFieldName = JSON.parse(getJsonParseLocalStorage()).nameForms;

  const {
    name,
    city,
    age,
    gender,
    skills,
    private_settings,
    phone,
    email,
    webSite,
    type_collective,
    portfolio_photo,
    schedule,
    address,
    metroId,
    institutionType,
    area,
  } = userDataProfile;

  let start: Date | null = new Date();
  let end: Date | null = new Date();

  if (schedule && schedule?.Friday) {
    start.setHours(+schedule.Friday[0].start.slice(0, 2), +schedule.Friday[0].start.slice(3, 5));
    end.setHours(+schedule.Friday[0].end.slice(0, 2), +schedule.Friday[0].end.slice(3, 5));
  } else {
    start = null;
    end = null;
  }

  const { control, handleSubmit, watch, setValue } = useForm<ISignUpFormValues>({
    mode: "onBlur",
    defaultValues: {
      name_field: name,
      city,
      gender,
      age: age && new Date(age),

      tool: skills.tool,
      genre: skills.genre,
      work_experience: skills.workExperience,
      master: skills.master,
      education: skills.education,
      inspiration: skills.inspiration,
      private_settings,
      phone,
      email_contact: email,
      web_site: webSite,
      type_collective,
      portfolio_photo,
      address,
      metroId,
      schedule,
      institutionType,
      area: area !== 0 ? area : null,
      from_opening_hours: start,
      to_opening_hours: end,
    },
  });

  const onSubmit = (data: ChangeProfileFormValues) => {
    let bodyDataSend = putUpdateMyFormAccountData(data, watchFieldName);
    const portfolio_photo = watch("portfolio_photo");

    const disp = () =>
      dispatch(
        updateDataMyFormTypeAccountThunk({
          typeAccount,
          bodyDataSend: bodyDataSend,
        })
      ).then(() => navigate(-1));

    if (!!portfolio_photo) {
      setData({
        //@ts-ignore
        formDataImg: portfolio_photo,
        profileId: JSON.parse(getJsonParseLocalStorage()).id,
      })
        .unwrap()
        .then(() => disp())
        .catch(() =>
          setOpenSnackbar({ open: true, text: "Тяжёлые фото портфолио", severity: "error" })
        );
    } else {
      disp();
    }
  };

  const watchMisician = watchFieldName === EnumTypeAccount.MUSICIAN;
  const watchTeam = watchFieldName === EnumTypeAccount.TEAM;
  const watchInstitution = watchFieldName === EnumTypeAccount.INSTITUTION;
  const watchSoundProduser = watchFieldName === EnumTypeAccount.SOUND_PRODUCER;

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className={s.formChangeProfile}>
      {watchTeam && (
        <ControllerTypeCollective
          control={control}
          name="type_collective"
          placeholder="Вид коллектива"
          options={teamTypeADS}
        />
      )}

      <ControllerTextField
        control={control}
        name="name_field"
        required={true}
        placeholder={!watchMisician ? "Название" : "Имя"}
      />

      {watchInstitution && (
        <ControllersInstitutionTypeAsync
          name="institutionType"
          control={control}
          placeholder="Тип заведения"
          required={true}
        />
      )}

      <ControllersCityAsync name="city" placeholder="Город" control={control} setValue={setValue} />
      {!watchMisician &&
        !watchTeam &&
        !watchSoundProduser &&
        (!!watch("city")?.metros?.length || metroId?.id) && (
          <>
            <ControllersMetroTest
              required={false}
              name="metroId"
              cityValue={city}
              placeholder="Станция метро"
              control={control}
              options={watch("city")?.metros}
            />
          </>
        )}

      {watchMisician && (
        <>
          <ControllerGender control={control} name="gender" required={false} />
          <ControllerAgeRmcPicker control={control} name="age" />
        </>
      )}

      {!watchMisician && !watchTeam && !watchSoundProduser ? (
        <ControllerTextField
          control={control}
          name="address"
          required={true}
          placeholder={"Адрес"}
        />
      ) : (
        !watchSoundProduser && (
          <>
            <ControllerToolsAsync
              control={control}
              placeholder={watchTeam ? "Состав" : "Инструмент (род деятельности)"}
              name="tool"
              required={watchTeam ? false : true}
            />

            <ControllerGenreAsync control={control} name="genre" />
          </>
        )
      )}

      {watchMisician && <ControllerMaster control={control} name="master" />}

      {(watchMisician || watchTeam) && (
        <ControllerWorkExperience
          control={control}
          name="work_experience"
          helperText="Опишите ваш опыт"
        />
      )}

      {watchMisician && <ControllerEducation control={control} name="education" />}

      {(watchMisician || watchTeam) && (
        <ControllerPrivateSettings control={control} name="private_settings" />
      )}

      <TitleTagH titleH="Портфолио" />
      {(watchMisician || watchTeam) && (
        <ControllerTextArea control={control} placeholder="О себе" name="inspiration" />
      )}
      <ControllerUploadPortfolio control={control} name="portfolio_photo" />

      <TitleTagH titleH="Контакты" />
      <ControllerPhone control={control} name="phone" />
      <ControllerEmail control={control} name="email_contact" />
      <ControllerWebSite control={control} name="web_site" />

      {!watchMisician && !watchTeam && (
        <>
          <TitleTagH titleH="Описание" />
          {!watchSoundProduser && (
            <ControllerOpeningHoursRmcPicker control={control} watch={watch} required={false} />
          )}
          {watchInstitution && (
            <ControllerRoomArea control={control} name="area" required={false} />
          )}

          <ControllerTextArea
            control={control}
            placeholder="Опишите ваше заведение"
            name="inspiration"
          />
        </>
      )}

      <div className={s.btnFormWrapper}>
        <BtnInGroupeSaveCancelMui textCancelButton="Отмена" textButton="Сохранить" />
      </div>

      {openSnackbar && (
        <SnackbarGlobal
          text={openSnackbar.text}
          open={openSnackbar.open}
          setOpen={setOpenSnackbar}
          severity={openSnackbar.severity}
        />
      )}
    </form>
  );
};
