import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth/";
const tokenKey = "token";
http.setToken(getToken());
export async function login(user) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email: user.emailId,
    password: user.password,
  });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithToken(token) {
  if (localStorage.getItem(tokenKey)) localStorage.removeItem(tokenKey);
  localStorage.setItem(tokenKey, token);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export async function changePassword(
  currentPassword,
  newPassword,
  reEnteredPassword
) {
  let user = jwtDecode(localStorage.getItem(tokenKey));
  user = {
    ...user,
    currentPassword: currentPassword,
    newPassword: newPassword,
    reEnteredPassword: reEnteredPassword,
  };
  return await http.post(apiEndPoint + "changePassword/" + user._id, user);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    //nothing to do, as we wanted to be not raise exception if jwt was not found in localStorage
    return null;
  }
}
export function getToken() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  getCurrentUser,
  loginWithToken,
  changePassword,
  getToken,
};
