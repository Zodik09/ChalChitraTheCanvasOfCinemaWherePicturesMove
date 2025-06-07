import axios from "axios";

const instance = axios.create({
    baseURL: "https://tmdb-proxy.adarshvishwakarma09nov2k.workers.dev"
});

export default instance;
