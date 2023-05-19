export const sxStyle = {
  textfield: {
    width: "100% !important",
    fontWeight: "700  !important",
    fontSize: "16px",
    color: "#242424 ",
    fontFamily: `Mulish_Regular, sans-serif !important`,
    padding: "0",
    height: "100% !important",

    "& .Mui-focused": {
      color: "#1A1C18 !important",
    },

    "& .MuiInputBase-root": {
      height: "100%",
      borderRadius: "12px",
      backgroundColor: "#E9F0DA",

      "& input": {
        color: "#1A1C18",
        padding: "0 14px 0 48px  !important",
        fontFamily: `Mulish_Regular, sans-serif !important`,
        fontSize: "16px !important",
        fontWeight: "600 !important",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #C6D1B8",
        borderRadius: "8px",
      },
    },
  },
  filterModalLayout: {
    "& .MuiDialog-container": {
      alignItems: "flex-end",

      "& .MuiPaper-root": {
        background: "#FDFDF5",
        borderRadius: "28px 28px 0px 0px",
        width: "100%",
        margin: 0,
        padding: "16px",
      },
    },
  }
}