import hourIcons from "../../../assets/icons/hourIcons.svg";
import {
 Checkbox,
 FormControl,
 FormHelperText,
 InputLabel,
 ListItemText,
 MenuItem,
 OutlinedInput,
 Select,
 SelectChangeEvent,
} from "@mui/material";
import "./styleTools.css";
import cn from "classnames";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { styleSxTool } from "./styleSxTool";
import {
 InstrumentGlobalType,
 ToolsGroupeItemType,
} from "../../../types/PROFILE/InstrumentGlobalType";
import exportIconsSVG from "../../../assets/icons/iconsTools/exportIconsSVG";
import { ChipsElement } from "./ChipsElement";
import { GroupeElement } from "./GroupeElement";

interface SelectToolsElementType {
 placeholder: string;
 value?: any;
 options: InstrumentGlobalType[];
 onChange: (personName: any) => void;
 errors: any;
 ItemRef: any;
 required?: boolean;
}

export const SelectToolsElement = ({
 placeholder,
 value,
 options,
 onChange,
 errors,
 ItemRef,
 required = false,
 ...props
}: SelectToolsElementType) => {
 const [classesHiddenCount, setClassesHiddenCount] = useState<number | null>(0);
 const [personName, setPersonName] = useState<string[]>(value.map((x: any) => x.name));
 const [open, setOpen] = useState(false);

 const set = () => setOpen((prev) => !prev);
 const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  const {
   target: { value },
  } = event;
  setPersonName(typeof value === "string" ? value.split(",") : value);
 };

 const handleDelete = (value: any) => {
  setPersonName(personName.filter((x) => x !== value));
 };

 useEffect(() => {
  let i: any = [];
  options.forEach((x) => {
   if (personName.includes(x.name)) {
    i.push(x);
   } else {
    x.subInstruments.forEach((m) => {
     if (personName.includes(m.name)) {
      i.push(m);
     }
    });
   }
  });

  onChange(i);
 }, [onChange, options, personName]);

 useEffect(() => {
  !!!value.length && !!personName.length && setPersonName([]);
 }, [value]);

 return (
  <FormControl
   focused={open || value.length !== 0}
   fullWidth
   sx={styleSxTool.formcontrol}
   error={errors}
  >
   <InputLabel required={required} id="demo-multiple-checkbox-label" sx={styleSxTool.inputLabel}>
    {placeholder}
   </InputLabel>
   <Select
    open={open}
    onOpen={set}
    onClose={set}
    fullWidth
    labelId="demo-multiple-checkbox-label"
    id="demo-multiple-checkbox"
    multiple
    value={personName}
    onChange={handleChange}
    input={<OutlinedInput label={placeholder} />}
    MenuProps={{ sx: styleSxTool.MenuProps }}
    sx={styleSxTool.select}
    renderValue={(selected) => {
     return (
      <Stack direction="row" spacing={1} sx={styleSxTool.stack}>
       {selected.map((values: any) => {
        return (
         <ChipsElement
          handleDelete={handleDelete}
          options={options}
          values={values}
          key={values.name}
         />
        );
       })}
      </Stack>
     );
    }}
    {...props}
   >
    {options.map((x: InstrumentGlobalType, index: number) => {
     let t = 0;

     if (x.subInstruments.length === 0) {
      return (
       <MenuItem sx={styleSxTool.menuItem} key={x.name} value={x.name}>
        <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(x.name) > -1} />
        <img alt="icon" src={x.icon ? exportIconsSVG[x.icon] : hourIcons} />
        <ListItemText primary={x.name} />
       </MenuItem>
      );
     }

     let r = [...x.subInstruments];
     x.subInstruments[0] && r.unshift(x.subInstruments[0]);

     return r.map((p: ToolsGroupeItemType) => {
      //let iconTools = options.map((op: any) => {
      //  const temp = op.subInstruments.find((x: any) => x.name === p.name);
      //  console.log(temp);
      //  return temp;
      //});

      if (t === 0) {
       t++;

       return (
        <GroupeElement
         key={t}
         x={x}
         index={index}
         classesHiddenCount={classesHiddenCount}
         setClassesHiddenCount={setClassesHiddenCount}
        />
       );
      } else {
       return (
        <MenuItem
         className={cn({
          optionCustom: index !== classesHiddenCount,
         })}
         sx={styleSxTool.menuItem}
         key={p.name}
         value={p.name}
        >
         <Checkbox sx={styleSxTool.checkbox} checked={personName.indexOf(p.name) > -1} />
         <img alt="icon" src={exportIconsSVG[p.icon] ?? hourIcons} />
         <ListItemText primary={p.name} />
        </MenuItem>
       );
      }
     });
    })}
   </Select>
   {errors && (
    <FormHelperText error={errors} sx={styleSxTool.helper}>
     {errors.message}
    </FormHelperText>
   )}
  </FormControl>
 );
};
