import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonSubmitMui } from "../../common/mui-element/ButtonSubmitMui";
import { FormsFilterType } from "./types/formsFilterType";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { optionsTypeAccount } from "../authorization/service/BD";
import { requiredADS, requiredVacancy, teamTypeADS } from "../vacancy/service/createVacancyBD";
import { FilterLayoutWrapper } from "../../common/layout/filterLayoutWraper/FilterLayoutWrapper";
import { ControllersCityAsync } from "../../common/hookFormControllers/ControllersCityAsync";
import { ControllerToolsAsync } from "../../common/hookFormControllers/ControllerToolsAsync";
import { ControllerGenreAsync } from "../../common/hookFormControllers/ControllerGenreAsync";
import { ControllerGender } from "../../common/hookFormControllers/ControllerGender";
import { ControllerMaster } from "../../common/hookFormControllers/ControllerMaster";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import {
  AdsFilterParamsRequestType,
  VacancyFilterParamsRequestType,
} from "../vacancy/types/FilterFormsAdsFieldsType";
import { RouteNames } from "../../core/router/RouteNames";
import { ControllerRandomSelect } from "../../common/hookFormControllers/ControllerRandomSelect";
import { EnumTypeDocumentType } from "../../types/PROFILE/enum/EnumTypeDocumentType";
import { ControllerAgeRangeRmcPicker } from "../../common/hookFormControllers/ControllerAgeRangeRmcPicker";
import { filterSubmit } from "./helpers/filterSubmit";
import { routeAccount, routeAnonnsemend, routeVacancy } from "./service/routesVariableForAds";
import { useClearResultsqueryAds } from "./hooks/useClearResultsqueryAds";
import s from "./style/filterFormsAds.module.scss";
import { ControllersInstitutionTypeAsync } from "../../common/hookFormControllers/ControllersInstitutionTypeAsync";

const deff = {
  city: null,
  tool: [],
  genre: [],
  gender: null,
  typeOfInstitution: null,
  teamType: null,
  who_is_looking_vacancy: null,
  who_is_looking_vacancy_partner: null,
  who_is_looking_ads: null,
  who_is_looking_questionnaire: null,
  fromAge: null,
  toAge: null,
  master: null,
};

interface FilterFormsAdsType {
  searchQuery: string | null;
  handleClose: () => void;
  setPageFu: (args: AdsFilterParamsRequestType | VacancyFilterParamsRequestType) => void;
  filterState: FormsFilterType;
  setFilterStateFu: (data: any) => void;
}

export const FilterFormsAds = ({
  handleClose,
  searchQuery,
  setPageFu,
  filterState,
  setFilterStateFu,
}: FilterFormsAdsType) => {
  const navigate = useNavigate();
  const { clearListVacancy, clearListAds, clearListAccount } = useClearResultsqueryAds();
  let location = useLocation();
  const locationTabs = location.pathname;

  const { control, handleSubmit, watch, reset, setValue } = useForm<FormsFilterType>({
    mode: "onBlur",
    defaultValues: filterState,
  });

  const watch_vacancy_partner = watch("who_is_looking_vacancy_partner")?.id;
  const who_is_looking_vacancy = watch("who_is_looking_vacancy")?.id;
  const watch_looking_ads = watch("who_is_looking_ads")?.id;
  const watch_questionnaire = watch("who_is_looking_questionnaire")?.id;

  useEffect(() => {
    searchQuery && onSubmit({ ...deff, query: searchQuery });
  }, [searchQuery]);

  const resetFormFields = () => reset(deff);
  const onSubmit = (data: FormsFilterType) => {
    handleClose();
    switch (locationTabs) {
      case routeVacancy:
        clearListVacancy();
        setPageFu(filterSubmit(data, "vacancy"));
        navigate(RouteNames.ADS);
        break;
      case routeAnonnsemend:
        clearListAds();
        setPageFu(filterSubmit(data, "ads"));
        navigate(RouteNames.ADS_LIST);
        break;
      default:
        clearListAccount();
        setPageFu(filterSubmit(data, "account"));
        navigate(RouteNames.ADS_QUESTIONNAIRE_LIST);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setFilterStateFu(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <FilterLayoutWrapper handleClose={handleClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className={s.headerForms}>
          <h1>Фильтр</h1>
          <IconButton
            onClick={resetFormFields}
            sx={{
              borderRadius: "10px",
              padding: "13px",
            }}
          >
            <h5>Очистить</h5>
          </IconButton>
        </div>

        <div className={s.gawField}>
          <ControllersCityAsync
            name="city"
            placeholder="Город"
            control={control}
            setValue={setValue}
            required={false}
          />
          <ControllerToolsAsync
            control={control}
            placeholder="Инструмент (род деятельности)"
            name="tool"
            required={false}
          />
          <ControllerGenreAsync control={control} name="genre" required={false} />

          <h2 className={s.filterForVacancy}>
            {locationTabs === routeVacancy
              ? "Фильтр по вакансиям"
              : locationTabs === routeAnonnsemend
              ? "Фильтр по объявлениям"
              : "Фильтр по анкетам"}
          </h2>

          {locationTabs === routeVacancy ? (
            <ControllerRandomSelect
              control={control}
              placeholder="Кто ищет?"
              name="who_is_looking_vacancy"
              options={optionsTypeAccount}
            />
          ) : locationTabs === routeAnonnsemend ? (
            <ControllerRandomSelect
              control={control}
              placeholder="Что/кого ищут?"
              name="who_is_looking_ads"
              options={requiredADS}
            />
          ) : (
            <ControllerRandomSelect
              name="who_is_looking_questionnaire"
              control={control}
              placeholder="Тип аккаунта"
              options={optionsTypeAccount}
            />
          )}

          {locationTabs === routeVacancy && (
            <>
              {who_is_looking_vacancy === EnumTypeAccount.INSTITUTION && (
                <ControllersInstitutionTypeAsync
                  name="typeOfInstitution"
                  control={control}
                  placeholder="Тип заведения"
                />
              )}
              <ControllerRandomSelect
                control={control}
                placeholder="Кого ищет?"
                name="who_is_looking_vacancy_partner"
                options={requiredVacancy}
              />
            </>
          )}

          {locationTabs === routeVacancy &&
            (watch_vacancy_partner === EnumTypeDocumentType.TEAM ? (
              <ControllerRandomSelect
                control={control}
                placeholder="Вид коллектива"
                name="teamType"
                options={teamTypeADS}
              />
            ) : (
              watch_vacancy_partner === EnumTypeDocumentType.MUSICIAN && (
                <WatchMusician control={control} watch={watch} />
              )
            ))}

          {locationTabs === routeAnonnsemend &&
            (watch_looking_ads === EnumTypeDocumentType.TEAM ? (
              <ControllerRandomSelect
                control={control}
                placeholder="Вид коллектива"
                name="teamType"
                options={teamTypeADS}
              />
            ) : watch_looking_ads === EnumTypeDocumentType.MUSICIAN ? (
              <WatchMusician control={control} watch={watch} />
            ) : watch_looking_ads === EnumTypeDocumentType.WORK ? (
              <ControllersInstitutionTypeAsync
                name="typeOfInstitution"
                control={control}
                placeholder="Место работы"
              />
            ) : null)}

          {locationTabs === routeAccount &&
            (watch_questionnaire === EnumTypeAccount.MUSICIAN ? (
              <WatchMusician control={control} watch={watch} />
            ) : watch_questionnaire === EnumTypeAccount.TEAM ? (
              <ControllerRandomSelect
                control={control}
                placeholder="Вид коллектива"
                name="teamType"
                options={teamTypeADS}
              />
            ) : watch_questionnaire === EnumTypeAccount.INSTITUTION ? (
              <ControllersInstitutionTypeAsync
                name="typeOfInstitution"
                control={control}
                placeholder="Тип заведения"
              />
            ) : null)}
        </div>

        <div className={s.btnWrapper}>
          <ButtonSubmitMui isValidInButton={false} textButton="Показать результаты" />
        </div>
      </form>
    </FilterLayoutWrapper>
  );
};

interface WatchMusicianType {
  watch: any;
  control: any;
}

const WatchMusician = ({ watch, control }: WatchMusicianType) => {
  return (
    <>
      <ControllerGender control={control} name="gender" required={false} />
      <ControllerAgeRangeRmcPicker control={control} watch={watch} />
      <ControllerMaster control={control} name="master" />
    </>
  );
};
