import { createContext, ReactNode, useState } from "react";
import { RouteNames } from "../core/router/RouteNames";

interface Props {
 children: ReactNode;
}
interface ParePositionScrollType {
 url: string;
 positionY: number;
}

export const ScrollContext = createContext({});

export const ReturnScrollContext = ({ children, ...props }: Props) => {
 const [newsScroll, setNewsScroll] = useState(0);
 const [vacancyScroll, setVacancyScroll] = useState(0);
 const [adsScroll, setAdsScroll] = useState(0);
 const [notification, setNotificationScroll] = useState(0);

 const setScroll = (key: string, scrollY: number) => {
  console.log(scrollY);
  switch (key) {
   case "news":
    setNewsScroll(scrollY);
    break;
   case "vacancyAds":
    setVacancyScroll(scrollY);
    break;
   case "ads":
    setAdsScroll(scrollY);
    break;
   case "notification":
    setNotificationScroll(scrollY);
    break;

   default:
    break;
  }
 };

 return (
  <ScrollContext.Provider
   value={{ newsScroll, vacancyScroll, adsScroll, notification, setScroll }}
   {...props}
  >
   {children}
  </ScrollContext.Provider>
 );
};

//const ref = useRef<HTMLDivElement | null>(null);
//<ChipsLayout refLink={ref}>

//interface ChipsLayoutType {
// children: ReactNode;
// refLink?: any;
//}
//export const ChipsLayout = forwardRef(({ children, refLink }: ChipsLayoutType) => {
// return (
//  <div ref={refLink} className={s.сhipsLayout}>
//   {children}
//  </div>
// );
//});

//export const ReturnScrollContext = ({ children, ...props }: Props) => {
//  const [newsScroll, setNewsScroll] = useState(300);
//  const [adsScroll, setAdsScroll] = useState(0);
//  const [notification, setNotificationScroll] = useState(0);

//  const setScroll = (key: string, scrollY: number) => {
//   switch (key) {
//    case "news":
//     setNewsScroll(scrollY);
//     break;
//    case "ads":
//     setAdsScroll(scrollY);
//     break;
//    case "notification":
//     setNotificationScroll(scrollY);
//     break;

//    default:
//     break;
//   }
//  };

//  return (
//   <ScrollContext.Provider value={{ newsScroll, adsScroll, notification, setScroll }} {...props}>
//    {children}
//   </ScrollContext.Provider>
//  );
// };
