import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSwipeHandleTouch = (linkL: string = ``, linkR: string = ``) => {
 const navigate = useNavigate();
 const [touchPosition, setTouchPosition] = useState<null | { x: number; y: number }>(null);

 const touchFu = (key: "start" | "move", e: React.TouchEvent | any) => {
  if (key === "start") {
   setTouchPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  } else {
   const touchDown = touchPosition;
   if (touchDown === null) return;

   const currentTouch = e.touches[0].clientX;
   const currentTouchY = e.touches[0].clientY;

   const diff = touchDown.x - currentTouch;

   if (touchPosition && touchPosition?.y - currentTouchY > 10) return null;

   if (diff > 10) navigate(linkR);
   if (diff < -10) navigate(linkL);
   setTouchPosition(null);
  }
 };

 return touchFu;
};
