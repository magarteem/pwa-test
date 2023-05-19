import { memo, useEffect, useRef, useState } from "react";
import { ToolsSliceType } from "../../../../../modules/user/types/userSliceType";
import hourIcons from "../../../../../assets/icons/hourIcons.svg";
import exportIconsSVG from "../../../../../assets/icons/iconsTools/exportIconsSVG";
import { calcSizeElementBeforeRender } from "../../../../../helpers/calcSizeElementBeforeRender";
import cn from "classnames";
import s from "./skillsLayoutTools.module.scss";

interface SkillsLayoutType {
  skillsDataItem: ToolsSliceType[];
  skillsCategoryTitle: string;
}

export const SkillsLayoutTools = memo(
  ({ skillsDataItem, skillsCategoryTitle }: SkillsLayoutType) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [showMore, setShowMore] = useState(false);
    const [data, setData] = useState<ToolsSliceType[]>([]);
    const [maxShowChips, setMaxShowChips] = useState<ToolsSliceType[]>([]);

    const toggle = (e: any, num: ToolsSliceType[]) => {
      e.preventDefault();
      setShowMore((prev) => !prev);
      showMore ? setMaxShowChips(num) : setMaxShowChips(skillsDataItem);
    };

    const num = () => {
      let m: ToolsSliceType[] = [];
      let sizeElements = 0;
      skillsDataItem.forEach((e) => {
        sizeElements = sizeElements + calcSizeElementBeforeRender(e.name) + 70;
        if (ref.current && sizeElements < ref.current.getBoundingClientRect().width * 2) {
          m.push(e);
        }
      });
      return m;
    };

    useEffect(() => {
      setShowMore(false);
      setMaxShowChips(num());
    }, [skillsDataItem]);

    useEffect(() => {
      setData(skillsDataItem.slice(0, maxShowChips.length));
    }, [maxShowChips]);

    return (
      <div className={s.skills}>
        <div className={s.profileDataFields}>
          <h2>{skillsCategoryTitle}</h2>

          <div ref={ref} className={s.skills_item}>
            {data.map((item, index) => (
              <div className={s.item} key={item.name}>
                <img alt="icon" src={exportIconsSVG[item.icon] ?? hourIcons} />
                {item.name}
              </div>
            ))}

            {!showMore && skillsDataItem.length > maxShowChips.length && (
              <div onClick={(e) => toggle(e, skillsDataItem)} className={cn(s.item, s.itemHidden)}>
                Ещё {skillsDataItem?.length - maxShowChips.length}
              </div>
            )}

            {showMore && data.length === skillsDataItem.length && (
              <div onClick={(e) => toggle(e, num())} className={cn(s.item, s.itemHidden)}>
                Скрыть
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
