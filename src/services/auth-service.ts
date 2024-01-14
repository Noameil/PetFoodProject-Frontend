import axios from "axios";
import { Cart } from "../backend/@Types";

const baseUrl = "http://localhost:8080/api/v1/auth";

export const register = (username: string, email: string, password: string) => {
  return axios.post(`${baseUrl}/signup`, { username, email, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`${baseUrl}/signin`, { username, password }).then((res) => {
    //logic what do we want to do with the token:
    //axios body: res.data.
    const token = res.data.jwt;

    if (token) {
      //remember me: save the token and username
      //localStorage.setItem("username", username);
      //localStorage.setItem("token", token);

      //instead of saving each string individually - we save an object as a string
      localStorage.setItem("user", JSON.stringify({ token, username }));
    }

    //ui will use res instead of res.data
    //return res.data
    return res;
  });
};

export const logout = () => {
  //forget the user
  localStorage.removeItem("user");
};

const authService = {register, login, logout}
export default authService;