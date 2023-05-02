import axios from "axios"


const api = axios.create({
    // baseURL: "http://localhost:8000/api",
    baseURL:"https://robo-qualidade.azurewebsites.net/api",
});

export default api
