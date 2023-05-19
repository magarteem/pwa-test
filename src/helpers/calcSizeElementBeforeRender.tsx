export const calcSizeElementBeforeRender = (e: string) => {
 const p = document.createElement("div");
 p.innerText = e;
 p.style.position = "absolute";
 p.style.top = "-1000px";
 document.body.appendChild(p);
 const size = p.offsetWidth;
 document.body.removeChild(p);
 return size;
};
