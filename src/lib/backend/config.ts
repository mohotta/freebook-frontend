import axios from "axios";


export const axiosInstance = axios.create({

    baseURL: "localhost:8080/api/v1",
    timeout: 10000,
    headers: {'Authorization': `${localStorage.getItem("cookieFallback") || ""}`}

})
