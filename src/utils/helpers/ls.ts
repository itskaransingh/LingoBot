// type LS = {
//     key: string
//     value?: string | any
// }

const setls = (key: string, value: any) => {
  if (typeof localStorage !== "undefined") {
    return localStorage?.setItem(key, JSON.stringify(value));
  } else {
    return null;
  }
};

const getls = (key: string) => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } else {
    return null;
  }
};

export { setls, getls };
