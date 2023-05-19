import { Outlet, useParams } from "react-router-dom";
import { useLayoutEffect } from "react";
import arrow_back from "../assets/icons/arrow_back.svg";
import { PopUpNavigateGradient } from "../common/components/navigateButton/PopUpNavigateGradient";
import { TabsComponentOtherProfilePosts } from "../common/components/profile/otherUserProfile/TabsComponentOtherProfilePosts";
import { HeaderStylesWrapper } from "../common/layout/headerStylesWrapper/HeaderStylesWrapper";
import { StylesFullScreen } from "../common/layout/stylesFullScreen/StylesFullScreen";
import { useAppDispatch } from "../core/redux/app/hooks";
import { otherUserDataQuery } from "../modules/user/otherUserDataQuery";

export const OtherUserРosts = () => {
  const { id_user } = useParams();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    return () => {
      dispatch(otherUserDataQuery.util.resetApiState());
    };
  }, []);

  return (
    <>
      <StylesFullScreen>
        <HeaderStylesWrapper
          cancelImgIcon={arrow_back}
          // textLabel={`Публикации ${
          //  thisOtherUsetAllProfile?.name.split(" ")[0]
          // }`}
          textLabel="Публикации пользователя"
        />
      </StylesFullScreen>

      <TabsComponentOtherProfilePosts />

      <StylesFullScreen>
        <Outlet context={[id_user]} />
      </StylesFullScreen>

      <PopUpNavigateGradient />
    </>
  );
};
