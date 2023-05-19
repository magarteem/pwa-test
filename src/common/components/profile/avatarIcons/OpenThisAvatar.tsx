import { FilterModalLayout } from "../../../layout/filterModalLayout/FilterModalLayout";
import { styleSxAvatar } from "./styleSxAvatar";

interface OpenThisAvatarType {
 avatar: string;
 openModal: boolean;
 setOpenModal: (bool: boolean) => void;
}

export const OpenThisAvatar = ({ avatar, openModal, setOpenModal }: OpenThisAvatarType) => {
 const handleClose = () => setOpenModal(false);

 return (
  <FilterModalLayout
   modalOpen={openModal}
   handleClose={handleClose}
   style={styleSxAvatar.openThisAvatar}
  >
   <img src={avatar} alt={avatar} />
  </FilterModalLayout>
 );
};
