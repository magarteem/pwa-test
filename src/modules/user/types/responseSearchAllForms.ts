import { ResponseGlobalType } from "../../../api/types/ResponseGlobalType";
import { PortfolioType } from "../../../types/PROFILE/accountMainGlobalType";
import { CityResultsType } from "../../../types/PROFILE/cityGlobalType";
import { EnumContactRequestStatusResponse } from "../../../types/PROFILE/enum/EnumContactRequestStatusResponse";
import { EnumPrivateType } from "../../../types/PROFILE/enum/EnumPrivateType";
import { GenreSliceType, ToolsSliceType } from "../../user/types/userSliceType";

export interface AllFormsType {
 formId: string;
 name: string;
 city: CityResultsType;
 avatar: PortfolioType;
 instruments: ToolsSliceType[];
 genres: GenreSliceType[];
 createdDate: string;
 birthday: string;
 contactRequestStatus: EnumContactRequestStatusResponse;
 formType: string;
 privateType: EnumPrivateType;
 tritoneUserId: string;
}

export interface ResponseSearchAllFormsType extends ResponseGlobalType {
 results: AllFormsType[];
}
