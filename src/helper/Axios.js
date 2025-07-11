import axios from "axios";

const Ax = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});

export default Ax;