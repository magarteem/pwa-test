import { useState } from "react";
import noAvatar from "../../../../assets/icons/noAvatar.svg";
import { OpenThisAvatar } from "./OpenThisAvatar";
import s from "./avatarPhoto.module.scss";

interface AvatarPhotoOtherUserProfileType {
 avatarPhoto?: string;
}

export const AvatarPhotoOtherUserProfile = ({ avatarPhoto }: AvatarPhotoOtherUserProfileType) => {
 const [openModal, setOpenModal] = useState(false);
 const handleClickOpenAvatar = () => setOpenModal((prev) => !prev);

 return (
  <div className={s.infoAccount}>
   <div className={s.photo} onClick={handleClickOpenAvatar}>
    <div className={s.wrapperPhoto}>
     <img src={avatarPhoto ? avatarPhoto : noAvatar} alt="avatar" />
    </div>
   </div>
   {avatarPhoto && (
    <OpenThisAvatar avatar={avatarPhoto} openModal={openModal} setOpenModal={setOpenModal} />
   )}
  </div>
 );
};
