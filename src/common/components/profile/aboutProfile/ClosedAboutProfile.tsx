import { NameProfile } from "../nameProfile/NameProfile";
import { MusicianTypeResponse } from "../../../../modules/user/types/putReqestUpdateMyForm";
import { BtnUserContact } from "./skills/BtnUserContact";
import { EnumPrivateType } from "../../../../types/PROFILE/enum/EnumPrivateType";
import { EnumContactRequestStatusResponse } from "../../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { useParams } from "react-router-dom";
import s from "./aboutProfile.module.scss";

interface ClosedAboutProfileType {
  userDataProfile: MusicianTypeResponse;
}

export const ClosedAboutProfile = ({ userDataProfile }: ClosedAboutProfileType) => {
  const { id_user } = useParams();

  return (
    <section className={s.main}>
      <NameProfile
        age={0}
        name={userDataProfile.document.name}
        city=""
        merto={null}
        address=""
        type_collective={undefined}
      />

      {id_user &&
        (userDataProfile.privateType === EnumPrivateType.HIDE_CONTACTS ||
          userDataProfile.privateType === EnumPrivateType.HIDE_ALL) &&
        userDataProfile.contactRequestStatus !== EnumContactRequestStatusResponse.MY_FORM && (
          <div className={s.noBorder}>
            <BtnUserContact
              contactRequestStatus={userDataProfile.contactRequestStatus}
              id_userForm={userDataProfile.id}
              parseJsonId=""
              privateType={userDataProfile.privateType}
            />
          </div>
        )}
    </section>
  );
};
