import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateType } from "./types/userSliceType";
import { getMyProfileApiThunk } from "./getMyProfileApiThunk";
import { MyTypeFormsAccountProfileType } from "./types/myTypeFormProfile";
import { EnumTypeAccount } from "../../types/PROFILE/enum/EnumTypeAccount";
import { actionGetDataThisActiveForms } from "./helpers/actionGetDataThisActiveForms";
import { updateDataMyFormTypeAccountThunk } from "./updateDataMyFormTypeAccountThunk";
import {
  getJsonParseLocalStorage,
  setJsonLocalStorage,
  setLocalStorageSwiperActiv,
} from "../../helpers/getJsonParseLocalStorage";
import { PortfolioType } from "../../types/PROFILE/accountMainGlobalType";
import { MusicianTypeResponse } from "./types/putReqestUpdateMyForm";
import { resetProfileData, resetProfileDataApiData } from "./service/resetProfileStore";

const TypeAccountType: { id: string; nameForms: string } = JSON.parse(getJsonParseLocalStorage());

interface PayloadReduser {
  tempData: MusicianTypeResponse | any;
  TypeAccountType: { id: string; nameForms: string };
}

const initialState: InitialStateType = {
  profileData: resetProfileData,
  profileDataApiData: resetProfileDataApiData,
  isActiveForms: getJsonParseLocalStorage() || "{}",
  allMyForms: [],
  error: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetState(state: InitialStateType) {
      state.profileDataApiData = resetProfileDataApiData;
    },
    updateAvatar(state: InitialStateType, action: PayloadAction<PortfolioType>) {
      state.profileData.avatar = action.payload;
    },
    toggleForm(state: InitialStateType, action: PayloadAction<PayloadReduser>) {
      if (action.payload.tempData) {
        state.profileData = actionGetDataThisActiveForms(
          action.payload.tempData,
          action.payload.TypeAccountType
        );
      }
      state.isActiveForms = action.payload.TypeAccountType
        ? JSON.stringify(action.payload.TypeAccountType)
        : getJsonParseLocalStorage();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateDataMyFormTypeAccountThunk.pending.type, (state: InitialStateType) => {
        state.isLoading = true;
      })
      .addCase(
        updateDataMyFormTypeAccountThunk.fulfilled.type,
        (state: InitialStateType, actions: PayloadAction<any>) => {
          state.isLoading = false;

          for (const key in actions.payload) {
            const element = actions.payload[key];
            if (element) {
              //@ts-ignore
              const m = state.profileDataApiData[key].map((x: any) => {
                if (x.id === element.id) {
                  state.profileData = actionGetDataThisActiveForms(element, TypeAccountType);
                  return element;
                } else return x;
              });
              //@ts-ignore
              state.profileDataApiData[key] = m;
            }
          }
        }
      )
      .addCase(
        updateDataMyFormTypeAccountThunk.rejected.type,
        (state: InitialStateType, actions: PayloadAction<string>) => {
          console.log("err register");
        }
      )

      // getMyProfileApiThunk
      .addCase(getMyProfileApiThunk.pending.type, (state: InitialStateType) => {
        state.isLoading = true;
      })
      .addCase(
        getMyProfileApiThunk.fulfilled.type,
        (state: InitialStateType, actions: PayloadAction<MyTypeFormsAccountProfileType[]>) => {
          state.isLoading = false;
          let checkData = true;

          const logicState = (itemObj: any, EnumTypeAccount: string) => {
            if (checkData && !Object.keys(JSON.parse(getJsonParseLocalStorage())).length) {
              setLocalStorageSwiperActiv(0);
              setJsonLocalStorage(itemObj.id, EnumTypeAccount);
              state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
              checkData = false;
            }

            if (checkData && itemObj.id === JSON.parse(getJsonParseLocalStorage()).id) {
              state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
              checkData = false;
            }

            if (actions.payload.length < 2) {
              state.profileData = actionGetDataThisActiveForms(itemObj, TypeAccountType);
            }
          };

          actions.payload.forEach((x) => {
            if (x.institutionForm) {
              state.profileDataApiData.institutionForm.push(x.institutionForm);
              state.allMyForms.push(x.institutionForm.id);
              logicState(x.institutionForm, EnumTypeAccount.INSTITUTION);
            } else if (x.musicalWorkshopForm) {
              state.allMyForms.push(x.musicalWorkshopForm.id);
              state.profileDataApiData.musicalWorkshopForm.push(x.musicalWorkshopForm);

              logicState(x.musicalWorkshopForm, EnumTypeAccount.MUSICAL_WORKSHOP);
            } else if (x.musicianForm) {
              state.allMyForms.push(x.musicianForm.id);
              state.profileDataApiData.musicianForm.push(x.musicianForm);

              logicState(x.musicianForm, EnumTypeAccount.MUSICIAN);
            } else if (x.soundProducerForm) {
              state.allMyForms.push(x.soundProducerForm.id);
              state.profileDataApiData.soundProducerForm.push(x.soundProducerForm);

              logicState(x.soundProducerForm, EnumTypeAccount.SOUND_PRODUCER);
            } else if (x.musicianSchoolForm) {
              state.allMyForms.push(x.musicianSchoolForm.id);
              state.profileDataApiData.musicianSchoolForm.push(x.musicianSchoolForm);

              logicState(x.musicianSchoolForm, EnumTypeAccount.MUSICIAN_SCHOOL);
            } else if (x.musicShopForm) {
              state.allMyForms.push(x.musicShopForm.id);
              state.profileDataApiData.musicShopForm.push(x.musicShopForm);
              logicState(x.musicShopForm, EnumTypeAccount.MUSIC_SHOP);
            } else if (x.rehearsalBaseForm) {
              state.allMyForms.push(x.rehearsalBaseForm.id);
              state.profileDataApiData.rehearsalBaseForm.push(x.rehearsalBaseForm);

              logicState(x.rehearsalBaseForm, EnumTypeAccount.REHEARSAL_BASE);
            } else if (x.recordingStudioForm) {
              state.allMyForms.push(x.recordingStudioForm.id);
              state.profileDataApiData.recordingStudioForm.push(x.recordingStudioForm);

              logicState(x.recordingStudioForm, EnumTypeAccount.TEAM);
            } else if (x.teamForm) {
              state.allMyForms.push(x.teamForm.id);
              state.profileDataApiData.teamForm.push(x.teamForm);

              logicState(x.teamForm, EnumTypeAccount.TEAM);
            }
          });
        }
      )
      .addCase(
        getMyProfileApiThunk.rejected.type,
        (state: InitialStateType, actions: PayloadAction<string>) => {
          state.isLoading = false;
        }
      );
  },
});

export const { updateAvatar, toggleForm, resetState } = userSlice.actions;
export default userSlice.reducer;
