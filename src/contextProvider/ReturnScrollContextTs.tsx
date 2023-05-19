import { createContext, useEffect, ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
 children: ReactNode;
}
interface ParePositionScrollType {
 url: string;
 positionY: number;
}

export const ScrollContextTs = createContext({});

export const ReturnScrollContextTs = ({ children, ...props }: Props) => {
 const { pathname } = useLocation();
 const [scrollState, setScrollState] = useState<ParePositionScrollType[] | []>([]);

 useEffect(() => {
  scrollState.forEach((x) => {
   if (x.url === pathname) {
    window.scrollTo({
     top: x.positionY,
     behavior: "smooth",
    });
   }
  });
 }, [pathname]);

 const setScroll = (urlPath: string, scrollY: number) => {
  //console.log("urlPath = ", urlPath, "scrollY = ", scrollY);

  const m = scrollState.findIndex((x) => x.url === urlPath);

  if (m === -1) {
   setScrollState([...scrollState, { url: urlPath, positionY: scrollY }]);
   return;
  }

  const set = scrollState.map((x) => {
   if (x.url === urlPath) {
    return {
     ...x,
     positionY: scrollY,
    };
   } else return x;
  });

  setScrollState(set);
 };

 return (
  <ScrollContextTs.Provider value={{ scrollState, setScroll }} {...props}>
   {children}
  </ScrollContextTs.Provider>
 );
};
