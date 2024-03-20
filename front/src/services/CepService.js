import axios from "axios";

const URL_API_CEP = "http://viacep.com.br/ws"

const getDadosCep = async (cep) => {
    const response = await axios.get(`${URL_API_CEP}/${cep}/json/`);
    return response.data;
}

export default getDadosCep;