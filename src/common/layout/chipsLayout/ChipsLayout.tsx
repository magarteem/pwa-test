import { ReactNode, forwardRef } from "react";
import s from "./сhipsLayout.module.scss";

interface ChipsLayoutType {
  children: ReactNode;
  refLink?: any;
}

export const ChipsLayout = forwardRef(({ children, refLink }: ChipsLayoutType) => {
  return (
    <div ref={refLink} className={s.сhipsLayout}>
      {children}
    </div>
  );
});
