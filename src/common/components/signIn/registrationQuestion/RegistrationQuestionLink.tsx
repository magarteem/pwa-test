import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../core/redux/app/hooks";
import { resetState } from "../../../../modules/authorization/authSlice";
import s from "./registrationQuestionLink.module.scss";

interface RegistrationQuestionLinkType {
 questionText: string;
 linkTo: string;
 lintText: string;
}

export const RegistrationQuestionLink = ({
 questionText,
 linkTo,
 lintText,
}: RegistrationQuestionLinkType) => {
 const dispatch = useAppDispatch();

 const reset = () => dispatch(resetState());

 return (
  <div onClick={reset} className={s.registrationQuestionLink}>
   <span>{questionText}</span>
   <Link to={linkTo}>{lintText}</Link>
  </div>
 );
};
