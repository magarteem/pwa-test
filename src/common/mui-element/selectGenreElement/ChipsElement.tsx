import { Chip } from "@mui/material";
import { ReactComponent as ClearIcon } from "../../../assets/icons/clearIcon.svg";
import { GenreGlobalType, GenreGroupeItemType } from "../../../types/PROFILE/genreGlobalType";

interface ChipsElementType {
  handleDelete: (value: any) => any;
  values: any;
  options: GenreGlobalType[];
}

export const ChipsElement = ({ handleDelete, values, options }: ChipsElementType) => {
  //let colorsChips = options.filter((color: GenreGlobalType) => color.name === values);
  const colorsChips = (): string => {
    let y: GenreGlobalType | GenreGroupeItemType | null = null;
    options.find((op: GenreGlobalType) => {
      if (op.subGenres.length === 0 && op.name === values && op.color) y = op;
      else {
        return op.subGenres.find((x: GenreGroupeItemType) => {
          if (x.name === values) y = x;
        });
      }
    });
    //@ts-ignore
    return y?.color ?? "#000";
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
      sx={{
        display: "flex !important",
        alignItems: "center !important",
        background: colorsChips(),
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
        borderRadius: " 30px",
        color: "white !important",
        fontSize: "14px",
        margin: "0 !important",

        "& .MuiChip-deleteIcon": {
          display: "flex",
          alignItems: "center",
          height: "10px !important",
          svg: {
            width: "14px",
            stroke: "#fff",
            path: {
              fill: "#fff",
            },
          },
        },
        "& .MuiChip-label": {
          padding: "3px 8px !important",
          "@media (max-width: 400px)": {
            padding: "0 6px !important",
          },
        },
      }}
    />
  );
};
