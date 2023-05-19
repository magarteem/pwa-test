import React from "react";
import s from "./button.module.scss";

interface PropsButton {
 textButton: string;
 isValidInButton?: boolean;
 onClick?: () => void;
 type?: "button" | "submit";
}

export const InButton = ({
 textButton,
 type = "submit",
 isValidInButton,
 onClick,
 ...props
}: PropsButton) => {
 return (
  <button
   className={s.buttonWrapper}
   type={type}
   disabled={isValidInButton}
   onClick={onClick}
   {...props}
  >
   {textButton}
  </button>
 );
};
