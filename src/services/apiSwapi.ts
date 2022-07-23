import axios from "axios";

const apiSwapi = axios.create({
    baseURL: "https://swapi.dev/api",
});

export default apiSwapi;
