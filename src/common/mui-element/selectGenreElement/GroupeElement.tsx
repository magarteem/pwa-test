import arrowSelect from "../../../assets/icons/arrowSelect.webp";
import { ListItemText } from "@mui/material";
import cn from "classnames";
import s from "../optionCustom.module.scss";
import { GenreGlobalType } from "../../../types/PROFILE/genreGlobalType";
import { styleSxGenre } from "./styleSxGenre";

interface GroupeElementType {
 x: GenreGlobalType;
 index: number;
 classesHiddenCount: number | null;
 setClassesHiddenCount: (index: number | null) => void;
}

export const GroupeElement = ({
 classesHiddenCount,
 index,
 setClassesHiddenCount,
 x,
}: GroupeElementType) => {
 const touchCheck = (e: any, index: number) => {
  classesHiddenCount !== index ? setClassesHiddenCount(index) : setClassesHiddenCount(null);
  e.preventDefault();
 };
 const touchCheckTouch = (e: any, index: number) => {
  classesHiddenCount !== index ? setClassesHiddenCount(index) : setClassesHiddenCount(null);
  e.preventDefault();
 };

 return (
  <div
   className={s.openMenu}
   onClick={(e) => touchCheck(e, index)}
   onTouchCancel={(e) => touchCheckTouch(e, index)}
  >
   <img
    className={cn({
     [s.iconArrow]: index !== classesHiddenCount,
    })}
    src={arrowSelect}
    alt="arrow"
    style={{ marginRight: "10px" }}
   />
   <ListItemText sx={styleSxGenre.listItem} primary={x.name} />
  </div>
 );
};
