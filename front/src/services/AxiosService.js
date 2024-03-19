import axios from "axios";

const API_URL = process.env.API_BACKEND_URL;

const getUsers = async () => {
    const response = await axios.get(`${API_URL}/api/users`);
    return response.data;
}