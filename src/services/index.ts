import axios from "axios"


const api = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL:"robo-qualidade.azurewebsites.net",
});

export default api
