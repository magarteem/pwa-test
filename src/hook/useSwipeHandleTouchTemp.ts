import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useSwipeHandleTouchTemp = (refs: any, linkL: string = ``, linkR: string = ``) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (refs.current) {
      refs.current.addEventListener("touchstart", (e: MouseEvent | TouchEvent) => handleTouchStart(e));
      refs.current.addEventListener("touchmove", (e: MouseEvent | TouchEvent) => handleTouchMove(e));
    }

    return () => {
      if (refs.current) {
        refs.current.removeEventListener("touchstart", (e: MouseEvent | TouchEvent) =>
          handleTouchStart(e)
        );
        refs.current.removeEventListener("touchmove", (e: MouseEvent | TouchEvent) =>
          handleTouchMove(e)
        );
      }
    };
  });

  let _xDown: number | null, _yDown: number | null;

  function handleTouchStart(event: React.TouchEvent | any) {
    const firstTouch = event.touches[0];
    _xDown = firstTouch.clientX;
    _yDown = firstTouch.clientY;
  }

  function handleTouchMove(event: any) {
    if (!_xDown || !_yDown) return;


    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;

    const xDiff = _xDown - xUp;
    const yDiff = _yDown - yUp;

    //if (yDiff > 10) return null; // test no swipe

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        navigate(linkR);
      } else {
        navigate(linkL);
      }
    }
    //else {
    // if (yDiff > 0) {
    //  /* up swipe */
    //  console.log("app: up swipe ", true);
    // } else {
    //  /* down swipe */
    //  console.log("app: down swipe ", true);
    // }
    //}

    /* reset values */
    _xDown = null;
    _yDown = null;
  }
};
