import axios from "axios";

export const getToken = () => localStorage.getItem("bearer");

export const request = axios.create({
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export const endpoint = "https://frontend-test.alluvium.net/";

export const isAuthenticated =
  localStorage.getItem("bearer") && localStorage.getItem("data");
