export const styleSxTextArea = {
 width: "100% !important",
 fontSize: "16px",
 fontFamily: `Mulish_Regular, sans-serif !important`,
 padding: "0",

 fieldset: {
  display: "none",
 },

 "& .MuiInputBase-root": {
  height: "auto",
  borderRadius: "8px",
  padding: "0 14px",
  color: "#43483E",
  fontFamily: `Mulish_Regular, sans-serif !important`,

  "&:focus": {
   height: "auto",
  },

  "& .MuiInputBase-input": {
   "&::-webkit-input-placeholder": {
    fontWeight: 500,
    color: "#242424",
    opacity: 1,
   },
  },
 },
};
