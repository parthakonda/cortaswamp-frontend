import axios from "axios";

const isAuthenticated = (to, from, next) => {
  if (localStorage.getItem("Token")) {
    next();
  } else {
    window.location.href = "/signin/";
  }
};

const login = (username, password) => {
  localStorage.setItem("API_DOMAIN", "http://localhost:8000");
  // Validate creds
  const creds = {
    email: username,
    password
  };
  return axios.post(`http://localhost:8000/api-token-auth/`, creds);
};

const setToken = token => {
  localStorage.setItem("Token", token);
};

const signup = data => {
  return axios.post(`http://localhost:8000/signup/`, data);
};

const resetPassword = (token, password) => {
  const data = {
    password: password
  };
  return axios.post(`http://localhost:8000/reset-password/${token}/`, data);
};

const checkPasswordLink = token => {
  return axios.post(`http://localhost:8000/check-password/${token}/`);
};

const sendPasswordLink = email => {
  let data = {
    email: email
  };
  return axios.post(`http://localhost:8000/forgot-password/`, data);
};

export default {
  login,
  isAuthenticated,
  setToken,
  signup,
  resetPassword,
  checkPasswordLink,
  sendPasswordLink
};
