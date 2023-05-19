export const minDate = new Date(1900, 8, 15, 0, 0, 0);
export let now = new Date();

//export function format(date: Date) {
// let mday = date.getDate();
// let month = date.getMonth() + 1;
// month = month < 10 ? `0${month}` : month;
// mday = mday < 10 ? `0${mday}` : mday;
// return `${date.getFullYear()}-${month}-${mday} ${date.getHours()}:${date.getMinutes()}`;
//}

//export const cn = typeof location !== "undefined" ? location.search.indexOf("cn") !== -1 : false;
//if (cn) {
// now = new Date();
//} else {
// now = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
//}
