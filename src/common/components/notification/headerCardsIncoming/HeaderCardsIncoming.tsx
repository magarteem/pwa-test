import { Avatar } from "@mui/material";
import { LongMenu } from "../../../mui-element/LongMenu";
import { Link } from "react-router-dom";
import { RouteNames } from "../../../../core/router/RouteNames";
import noAvatar from "../../../../assets/icons/noAvatar.svg";
import { ResultIncomingTypeResponse } from "../../../../modules/notification/types/responseNotificationType";
import { optionTypeMyAccountLowerCase } from "../../../../modules/user/helpers/optionTypeMyAccount";
import { dateDeclension } from "../../../../helpers/dateDeclension";
import { getThisPageURL } from "../../../../helpers/getThisPageURL";
import s from "./headerCardsIncoming.module.scss";

interface HeaderCardsType {
  menu?: boolean;
  x: ResultIncomingTypeResponse;
}

export const HeaderCardsIncoming = ({ menu = true, x }: HeaderCardsType) => {
  return (
    <div className={s.headerCardsIncoming}>
      <Link to={`${RouteNames.OTHER_PROFILE_USER}/${x.triggerForm.formId}`} className={s.author}>
        <div className={s.avatar}>
          <Avatar alt="avatar" src={x.triggerForm?.avatar ? x.triggerForm.avatar.uri : noAvatar} />
        </div>
        <div className={s.infoAuthor}>
          <h2 className={s.name}>{x.triggerForm?.name}</h2>
          <span className={s.visit}>
            {`${optionTypeMyAccountLowerCase[x.triggerForm.formType.toLowerCase()]}, ${
              x.triggerForm.city.title
            }`}
          </span>
          <p className={s.triggetInfo}>
            {`${x.type === "Contact" ? "" : "на"}`}{" "}
            <span>{` ${
              x.type === "Contact" ? "Запрашивает контакты" : x.announcement?.title
            }`}</span>{" "}
            {`, от ${dateDeclension(new Date(x.triggerForm.createdDate).getTime(), "D MMMM")}`}{" "}
          </p>
        </div>
      </Link>

      {menu && (
        <LongMenu
          options={[
            {
              label: "Скопировать ссылку",
              link: "",
              action: () => getThisPageURL(),
            },
          ]}
        />
      )}
    </div>
  );
};
