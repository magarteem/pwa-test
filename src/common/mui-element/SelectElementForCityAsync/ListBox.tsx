import React, { ForwardedRef, forwardRef, useImperativeHandle, useRef } from "react";

interface ListBoxProps extends React.HTMLAttributes<HTMLUListElement> {}
type NullableUlElement = HTMLUListElement | null;

export const ListBox = forwardRef((props: ListBoxProps, ref: ForwardedRef<HTMLUListElement>) => {
 const { children, ...rest } = props;
 const innerRef = useRef<HTMLUListElement>(null);
 useImperativeHandle<NullableUlElement, NullableUlElement>(ref, () => {
  return innerRef.current;
 });

 return (
  <ul {...rest} ref={innerRef} role="list-box">
   {children}
  </ul>
 );
});
