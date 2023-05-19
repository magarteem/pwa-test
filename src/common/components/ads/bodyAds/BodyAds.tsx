import noAvatar from "../../../../assets/icons/noAvatar.svg";
import Avatar from "@mui/material/Avatar";
import { dateDeclension } from "../../../../helpers/dateDeclension";
import { GroupeToolsAndGenreChips } from "../groupeToolsAndGenreChips/GroupeToolsAndGenreChips";
import { ResultAdsTypeResponse } from "../../../../modules/ads/types/responseAdsType";
import { NavLink } from "react-router-dom";
import { RouteNames } from "../../../../core/router/RouteNames";
import s from "./bodyAds.module.scss";
import { optionTypeMyAccountLowerCase } from "../../../../modules/user/helpers/optionTypeMyAccount";

interface BodyAdsType {
 x: ResultAdsTypeResponse;
}

export const BodyAds = ({ x }: BodyAdsType) => {
 const t = optionTypeMyAccountLowerCase[x.form.type?.toLowerCase()];
 return (
  <div className={s.bodyAds}>
   <div className={s.flexPositions}>
    <NavLink to={`${RouteNames.OTHER_PROFILE_USER}/${x.form.formId}`} className={s.avatarBlock}>
     <Avatar alt="avatar" src={x.form.avatar?.uri || noAvatar} />
    </NavLink>

    <div className={s.city}>
     <h3>
      {x.form.city.title}
      {x.form.address && (
       <>
        {`${x.form.address && ", "}`}
        {`${x.form.address}`}
       </>
      )}
     </h3>
     <p>{`${x.form.name}  ${
      x.form.type
       ? "(" + optionTypeMyAccountLowerCase[x.form.type?.toLowerCase()].toLowerCase() + ")"
       : ""
     }`}</p>
    </div>
   </div>

   {(x.instruments.length > 0 || x.genres.length > 0) && (
    <div className={s.skills}>
     <GroupeToolsAndGenreChips tools={x.instruments} genre={x.genres} />
    </div>
   )}

   <div className={s.about}>{x.description}</div>
   <div className={s.publicationDate}>{`Опубликовано ${dateDeclension(
    new Date(x.createdTime).getTime()
   )}`}</div>
  </div>
 );
};
