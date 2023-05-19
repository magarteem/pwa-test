import exportIconsSVG from "../../../assets/icons/iconsTools/exportIconsSVG";
import hourIcons from "../../../assets/icons/hourIcons.svg";
import s from "./chipsToolItem.module.scss";

interface ChipsToolItemType {
 itemLabel: any;
}

export const ChipsToolItem = ({ itemLabel }: ChipsToolItemType) => {
 return (
  <div className={s.item} key={itemLabel.name}>
   <img alt="icon" src={itemLabel.icon ? exportIconsSVG[itemLabel.icon] : hourIcons} />
   {itemLabel.name}
  </div>
 );
};
