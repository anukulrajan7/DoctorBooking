import Cookies from "js-cookie";

export const setUserCookie = (user, token) => {
  Cookies.set("token", token, { expires: 1 });
  Cookies.set("user", JSON.stringify(user), { expires: 1 });
};

export const getTokenFromCookie = () => Cookies.get("token");

export const getUserFromCookie = () => {
  try {
    const user = Cookies.get("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const removeUserCookie = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};
