import cancelImgIcon from "../../assets/icons/arrowBack.svg";
import { useNavigate, useParams } from "react-router-dom";
import { FormLayoutCreateADS } from "../../common/layout/formLayoutCreateADS/FormLayoutCreateADS";
import { useAppSelector } from "../../core/redux/app/hooks";
import { CreateFormVacancy } from "../../modules/vacancy/CreateFormVacancy";
import { CreateFormADS } from "../../modules/vacancy/CreateFormADS";
import { FormProvider, useForm } from "react-hook-form";
import { FormsCreatedVacancyType } from "../../modules/vacancy/types/typeFormsCreatedAds";
import {
  useUpdateThisAdsPostMutation,
  useUpdateThisVacancyPostMutation,
} from "../../modules/vacancy/adsQuery";
import { selectParamsForCreateVacancy } from "../../modules/vacancy/helpers/selectParamsForCreateVacancy";
import { selectParamsForCreateAds } from "../../modules/vacancy/helpers/selectParamsForCreateAds";
import { ResultAdsTypeResponse } from "../ads/types/responseAdsType";
import { changeComposeFu } from "./helpers/changeComposeFu";
import s from "./style/changeThisAds.module.scss";

interface ChangeThisAdsFormsType {
  data: ResultAdsTypeResponse | undefined;
}
export const ChangeThisAdsForms = ({ data }: ChangeThisAdsFormsType) => {
  const { change_id_ads } = useParams();
  const navigate = useNavigate();
  const activeTypeForm = useAppSelector((state) => state.userSliceReducer.isActiveForms);
  const parseJson = JSON.parse(activeTypeForm);
  const [updateNewVacancy] = useUpdateThisVacancyPostMutation();
  const [updateNewAds] = useUpdateThisAdsPostMutation();

  const { typeOfInstitution, changeData, nAds, nVacancy } = changeComposeFu(data);

  const methodVacancy = useForm<FormsCreatedVacancyType>({
    mode: "onBlur",
    defaultValues: {
      ...changeData,
      required: nVacancy(),
    },
  });

  const onSubmitVacancy = (dataForm: FormsCreatedVacancyType) => {
    const data = selectParamsForCreateVacancy(dataForm, parseJson.id);
    change_id_ads && updateNewVacancy({ data, change_id_ads }).unwrap();
    navigate(-1);
  };

  const methodAds = useForm<FormsCreatedVacancyType>({
    mode: "onBlur",
    defaultValues: {
      ...changeData,
      required: nAds(),
      typeOfInstitution,
    },
  });

  const onSubmitAds = (dataForm: FormsCreatedVacancyType) => {
    const data = selectParamsForCreateAds(dataForm, parseJson.id);
    change_id_ads && updateNewAds({ data, change_id_ads }).unwrap();
    navigate(-1);
  };

  if (!data) return <h1>Not Found this ADS ...</h1>;

  return (
    <FormLayoutCreateADS textLabel="Редактировать" arrowCanselImgIcon={cancelImgIcon}>
      {data.conditions ? (
        <FormProvider {...methodVacancy}>
          <form
            noValidate
            className={s.formVacancy}
            onSubmit={methodVacancy.handleSubmit(onSubmitVacancy)}
          >
            <CreateFormVacancy buttonSubmitText="Редактировать вакансию" />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...methodAds}>
          <form noValidate className={s.formVacancy} onSubmit={methodAds.handleSubmit(onSubmitAds)}>
            <CreateFormADS buttonSubmitText="Редактировать объявление" />
          </form>
        </FormProvider>
      )}
    </FormLayoutCreateADS>
  );
};
