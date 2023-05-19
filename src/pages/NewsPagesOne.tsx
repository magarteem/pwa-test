import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import moreButtonCircle from "../assets/icons/more-button-circle.svg";
import arrow_back from "../assets/icons/arrow_back.svg";
import shareIcons from "../assets/icons/shareIcons.svg";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { OptionLongMenuType } from "../modules/timeLine/types/timlineSliceType";
import { LongMenu } from "../common/mui-element/LongMenu";
import { HeaderCardsNews } from "../common/components/timeLine/headerCards/HeaderCardsNews";
import { RouteNames } from "../core/router/RouteNames";
import { ChipsGenreItem } from "../common/ui-elements/chips/ChipsGenreItem";
import { ChipsToolItem } from "../common/ui-elements/chips/ChipsToolItem";
import { getThisPageURL } from "../helpers/getThisPageURL";
import { useDeleteNewsMutation, useOneNewsQuery } from "../modules/timeLine/getNewsListQuery";
import { selectTypeNews } from "../modules/timeLine/service/optionСategoryBD";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import s from "./styles/newsPagesOne.module.scss";

interface OutletType {
 myProfileKey: string[];
}

export const NewsPagesOne = () => {
 const { id_news } = useParams();
 const { data: dataNews } = useOneNewsQuery(id_news || "");

 const [deleteNews] = useDeleteNewsMutation();
 const { myProfileKey }: OutletType = useOutletContext();

 const navigate = useNavigate();

 const deleteThisNews = () => {
  id_news && deleteNews(id_news);
  navigate(-1);
 };

 const objectSkills = dataNews && [...dataNews.genres, ...dataNews.instruments];

 const complain = () => {
  window.location.href = "mailto:support@3-tone.ru";
  //e.preventDefault();
 };

 // вынести в useOptionsLongMenu
 let options: OptionLongMenuType[] = [
  {
   label: "Скопировать ссылку",
   link: "",
   action: () => getThisPageURL(),
  },
 ];

 if (dataNews && myProfileKey.includes(dataNews.form.formId)) {
  options = [
   ...options,
   {
    label: "Удалить",
    link: RouteNames.HOME,
    action: deleteThisNews,
   },
  ];
 } else {
  options = [
   {
    label: "Пожаловаться",
    link: "",
    action: complain,
   },
   ...options,
  ];
 }
 return (
  <StylesFullScreen>
   <HeaderStylesWrapper
    cancelImgIcon={arrow_back}
    textLabel="Новость"
    share={shareIcons}
    tsxElement={<LongMenu moreButtonCircle={moreButtonCircle} options={options} />}
   />
   {!dataNews ? (
    <PreLoader />
   ) : (
    <section className={s.timeline}>
     {<HeaderCardsNews author={dataNews.form} menu={false} timeLinePost={dataNews} />}

     <div className={s.bodyNews}>
      {dataNews.attachments.map((elem, index) => (
       <img key={index} src={elem.uri} alt={elem.name} />
      ))}

      <pre className={s.textInfo}>{dataNews.body}</pre>
     </div>

     <div className={s.footerNews}>
      <span className={s.theme}>{selectTypeNews[dataNews.type]}</span>

      {objectSkills?.map((x: any) => {
       if (Object.keys(x).includes("icon")) {
        return <ChipsToolItem itemLabel={x} key={x.id} />;
       } else if (Object.keys(x).includes("color")) {
        return <ChipsGenreItem itemLabel={x} key={x.id} />;
       }
      })}
     </div>
    </section>
   )}
  </StylesFullScreen>
 );
};
