import axios from "axios";

const instance = axios.create({
  // baseURL: "https://sapb1:50000/b1s/v1",
    baseURL: "/b1s/v1",
  //   baseURL: "http://idlogix.utis.pk:8089/malpos-api/public/api/",
});

export default instance;

//malpos-api
// idlogix.utis.pk
