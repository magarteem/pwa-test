import arrowCanselImgIcon from "../assets/icons/clearIcon.svg";
import { FormLayoutCreateADS } from "../common/layout/formLayoutCreateADS/FormLayoutCreateADS";
import { ChangeThisNewsForm } from "../modules/timeLine/ChangeThisNewsForm";

export const ChangeThisNews = () => {
  return (
    <FormLayoutCreateADS textLabel="Редактировать новость" arrowCanselImgIcon={arrowCanselImgIcon}>
      {/*<ChangeThisNewsForm changeDataNews={changeDataNews} />*/}
    </FormLayoutCreateADS>
  );
};
