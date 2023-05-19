import { Chip } from "@mui/material";
import hourIcons from "../../../assets/icons/hourIcons.svg";
import { ReactComponent as ClearIcon } from "../../../assets/icons/clearIcon.svg";
import exportIconsSVG from "../../../assets/icons/iconsTools/exportIconsSVG";
import { styleSxTool } from "./styleSxTool";
import {
 InstrumentGlobalType,
 ToolsGroupeItemType,
} from "../../../types/PROFILE/InstrumentGlobalType";

interface ChipsElementType {
 handleDelete: (value: any) => any;
 values: any;
 options: InstrumentGlobalType[];
}

export const ChipsElement = ({ handleDelete, values, options }: ChipsElementType) => {
 const iconTools = (): string => {
  let y: InstrumentGlobalType | ToolsGroupeItemType | null = null;
  options.find((op: InstrumentGlobalType) => {
   if (op.subInstruments.length === 0 && op.name === values && op.icon) y = op;
   else {
    return op.subInstruments.find((x: ToolsGroupeItemType) => {
     if (x.name === values) y = x;
    });
   }
  });

  //@ts-ignore
  return exportIconsSVG[y?.icon] ?? hourIcons;
 };

 return (
  <Chip
   deleteIcon={
    <span
     onMouseDown={(event) => {
      event.stopPropagation();
     }}
    >
     <ClearIcon />
    </span>
   }
   onDelete={() => handleDelete(values)}
   key={values}
   label={values}
   avatar={<img alt="icon" src={iconTools()} />}
   sx={styleSxTool.chip}
  />
 );
};
