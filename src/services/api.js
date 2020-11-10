import axios from "axios";

const api = axios.create({
  baseURL: "https://sapo-alimenticio.herokuapp.com/"
});

export default api;
