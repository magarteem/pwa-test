import { ReactNode, memo, useEffect, useLayoutEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { PreLoader } from "../../components/preLoader/PreLoader";
import s from "./ribbonLayout.module.scss";
import { useLocation } from "react-router-dom";
import { ScrollContextTs } from "../../../contextProvider/ReturnScrollContextTs";

interface RibbonLayoutType {
 children: ReactNode;
 isFetching?: boolean;
 setPageFu?: () => void;
 linkRef?: any;
}

export const RibbonLayout = memo(
 ({ children, isFetching, setPageFu, linkRef }: RibbonLayoutType) => {
  const { scrollState, setScroll }: any = useContext(ScrollContextTs);
  const { pathname } = useLocation();

  const { ref, inView, entry } = useInView({
   threshold: 0,
   rootMargin: "100px",
  });

  useEffect(() => {
   inView && setPageFu && setPageFu();
  }, [inView]);

  useLayoutEffect(() => {
   return () => {
    entry && entry.rootBounds && setScroll(pathname, window.scrollY);
   };
  }, [entry, pathname]);

  return (
   <section ref={linkRef} className={s.ribbonLayout}>
    {children}
    <span ref={ref}>{isFetching && <PreLoader />}</span>
   </section>
  );
 }
);
