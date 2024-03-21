import axios from "axios";

const API_URL = "http://localhost:5294";

const getUsers = async () => {
    const response = await axios.get(`${API_URL}/api/users`);
    return response
}

const getDadosUserId = async (id) => {
    const response = await axios.get(`${API_URL}/api/users/${id}`);
    return response
}

const loginService = async (dadosLogin) => {
    const url = `${API_URL}/api/users/login`
    const response = await axios.post(url, dadosLogin);
    return response
}

const registerService = async (dadosUsuario) => {
    const response = await axios.post(`${API_URL}/api/users/register`, dadosUsuario);
    return response
}

export default {
    getUsers,
    getDadosUserId,
    loginService,
    registerService,
};