import Input from "../../components/Input";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import AxiosService from "../../services/AxiosService";
import Cookies from 'js-cookie';
import { set } from "zod";
import './homePage.css'
import {useRef, useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';

const HomePage = () => {

    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
    const [complementacao, setComplementacao] = useState("");

    const [imgProfile, setImgProfile] = useState("");
    const [descriptionProfile, setDescriptionProfile] = useState("");
    const [dateRegister, setDateRegister] = useState("");
    const idUser = Cookies.get('id')

    const getDados = () => {
        AxiosService.getDadosUserId(idUser)
        .then((res) => {
            setNome(res.name);
            setUsername(res.userName);
            setEmail(res.email);
            setTelefone(res.telephone);
            
            setCep(res.cep);
            setEndereco(res.locationAdress);
            setNumero(res.locationNumber);
            setBairro(res.district);
            setCidade(res.city);
            setEstado(res.state);
            setComplementacao(res.complementation)
            
            setImgProfile(res.imageProfile)
            setDescriptionProfile(res.descriptionProfile)
            setDateRegister(res.registeredDate)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // funções para inserção de imagem
    const inputRef = useRef();
    const handleChangeClick = () => {
        inputRef.current.click();
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImgProfile(file);
    };

    useEffect(() => {
        getDados()
    },[])

    return(
        <>
            <Navbar/>
            <div className="container">
                <div className="img-input" data-img="" onClick={handleChangeClick}>
                    {imgProfile ? (
                        <>
                            <img
                                src={URL.createObjectURL(imgProfile)}
                                alt=""
                            />
                        </>
                    ) : (
                        <>
                            <PersonIcon className="icon" fontSize='44'/>
                        </>
                    )}
                    <input
                        type="file"
                        ref={inputRef}
                        onChange={handleImageChange}
                        id="file"
                        hidden
                    />
                </div>
                <div className="container-welcome">
                    <h1>
                        Seja muito bem vindo {nome}!
                    </h1>
                </div>

                <h1>Dados de usuario</h1>
                <div className="container-card">
                    <Input 
                        value={nome}
                        label="Nome"
                        disabled={true}
                    />
                    <Input 
                        value={username}
                        label="Username"
                        disabled={true}
                    />
                    <Input 
                        value={email}
                        label="Email"
                        disabled={true}
                    />
                    <Input 
                        value={telefone}
                        label="Telefone"
                        disabled={true}
                    />
                </div>
                <h1>Dados de Endereço</h1>
                <div className="container-card2">
                    <Input 
                        value={cep}
                        label="Cep"
                        disabled={true}
                    />
                    <Input 
                        value={endereco}
                        label="Endereco"
                        disabled={true}
                    />
                    <Input 
                        value={numero}
                        label="Numero"
                        disabled={true}
                    />
                    <Input 
                        value={bairro}
                        label="Bairro"
                        disabled={true}
                    />
                    <Input 
                        value={cidade}
                        label="Cidade"
                        disabled={true}
                    />
                    <Input 
                        value={estado}
                        label="Estado"
                        disabled={true}
                    />
                    <Input 
                        value={complementacao}
                        label="Complementacao"
                        disabled={true}
                    />
                </div>
            </div>
        </>
    )
}

export default HomePage;