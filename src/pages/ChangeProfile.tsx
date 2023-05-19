import arrowReturnWhite from "../assets/icons/arrowBack.svg";
import { PreLoader } from "../common/components/preLoader/PreLoader";
import { HeaderProfile } from "../common/components/profile/cardsProfile/HeaderProfile";
import { HeaderWrapper } from "../common/layout/header/HeaderWrapper";
import { useAppSelector } from "../core/redux/app/hooks";
import { ChangePhoto } from "../modules/user/ChangePhoto";
import { FormChangeProfile } from "../modules/user/FormChangeProfile";
import s from "./styles/changeProfile.module.scss";

export const ChangeProfile = () => {
 const userDataProfile = useAppSelector((state) => state.userSliceReducer);

 if (userDataProfile.isLoading) return <PreLoader />;

 return (
  <>
   <HeaderWrapper srcPhoto={userDataProfile.profileData.avatar?.uri}>
    <HeaderProfile
     profileDataApiData={false}
     textLabel="Редактировать профиль"
     cancelImgIcon={arrowReturnWhite}
     avatar={userDataProfile.profileData.avatar?.uri}
    />
   </HeaderWrapper>

   <section className={s.main}>
    <div className={s.changeAvatar}>
     <ChangePhoto thisSrcAvatar={userDataProfile.profileData.avatar?.uri} />
    </div>

    <FormChangeProfile userDataProfile={userDataProfile.profileData} />
   </section>
  </>
 );
};
