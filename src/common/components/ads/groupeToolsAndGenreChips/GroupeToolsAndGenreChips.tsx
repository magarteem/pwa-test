import { memo, useEffect, useRef, useState } from "react";
import { GenreType, ToolsType } from "../../../../modules/authorization/types/authType";
import { ChipsLayout } from "../../../layout/chipsLayout/ChipsLayout";
import { ChipsGenreItem } from "../../../ui-elements/chips/ChipsGenreItem";
import { ChipsToolItem } from "../../../ui-elements/chips/ChipsToolItem";
import cn from "classnames";
import s from "./groupeToolsAndGenreChips.module.scss";
import { calcSizeElementBeforeRender } from "../../../../helpers/calcSizeElementBeforeRender";

interface GroupeToolsAndGenreChipsType {
 tools: ToolsType[];
 genre: GenreType[];
}

export const GroupeToolsAndGenreChips = memo(({ tools, genre }: GroupeToolsAndGenreChipsType) => {
 const objectSkills = [...tools, ...genre];
 const ref = useRef<HTMLDivElement | null>(null);
 const [showMore, setShowMore] = useState(false);
 const [data, setData] = useState<(ToolsType | GenreType)[]>([]);
 const [maxShowChips, setMaxShowChips] = useState(0);

 const toggle = (num: number) => {
  setShowMore((prev) => !prev);
  showMore ? setMaxShowChips(num) : setMaxShowChips(objectSkills.length);
 };

 const num = () => {
  let m: (ToolsType | GenreType)[] = [];
  let sizeElements = 0;
  objectSkills.forEach((e: ToolsType | GenreType) => {
   sizeElements = sizeElements + calcSizeElementBeforeRender(e.name) + 70;
   if (ref.current && sizeElements < ref.current.offsetWidth * 2) {
    m.push(e);
   }
  });
  return m.length;
 };

 useEffect(() => {
  setShowMore(false);
  setMaxShowChips(num());
 }, []);

 useEffect(() => {
  setData(objectSkills.slice(0, maxShowChips));
 }, [maxShowChips]);

 return (
  <ChipsLayout refLink={ref}>
   {data.map((x: any) => {
    if (!!x.icon) {
     return <ChipsToolItem itemLabel={x} key={x.id} />;
    } else if (x.color) {
     return <ChipsGenreItem itemLabel={x} key={x.id} />;
    }
   })}

   {!showMore && objectSkills?.length > maxShowChips && (
    <div
     onClick={(e) => {
      e.preventDefault();
      toggle(objectSkills.length);
     }}
     className={cn(s.item, s.itemHidden)}
    >
     Ещё {objectSkills.length - maxShowChips}
    </div>
   )}

   {showMore && data.length === objectSkills.length && (
    <div
     onClick={(e) => {
      e.preventDefault();
      toggle(num());
     }}
     className={cn(s.item, s.itemHidden)}
    >
     Скрыть
    </div>
   )}
  </ChipsLayout>
 );
});
