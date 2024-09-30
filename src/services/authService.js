/* eslint-disable import/no-anonymous-default-export */
import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

httpService.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
  const { data: jwt } = await httpService.post(`${config.apiEndpoint}/auth`, {
    email,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
