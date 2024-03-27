import React, {useRef, useState, useEffect} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Form from "../../components/Form"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SearchIcon from '@mui/icons-material/Search';
import './FormRegister.css';
import PersonIcon from '@mui/icons-material/Person';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axiosService from '../../services/AxiosService';
import getDadosCep from '../../services/CepService';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Modal from '../../components/Modal';
import CheckIcon from '@mui/icons-material/Check';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import CircularProgress from '@mui/material/CircularProgress';

const steps = ['Informações de dados cadastrais', 'Informações de localidade', 'Complementação'];

export default function FormRegister() {
    const [modalSucess, setModalSucess] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [modalConteudo, setModalConteudo] = useState("")

    const closeModal = () => {
        setModalSucess(false)
        setModalError(false)
        setModalAlert(false)
    }

    const [loading, setLoading] = useState(false);

    // variaveis das divisões de tela
    const [activeStep, setActiveStep] = useState(0);

    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState();
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");
  
    const [role, setRole] = useState("TESTE");

    // variaveis de add imagem do usuario
    const inputRef = useRef();
    const [imageProfile, setImageProfile] = useState("");

    const [errorRegister, setErrorRegister] = useState("");
    // Validação dos inputs com ZOD
    const schema = z.object({
        nome: z.string()
        .nonempty("Campo obrigatório!"),
        username: z.string()
        .nonempty("Campo obrigatório!"),
        email: z.string()
        .nonempty("Campo obrigatório!"),
        senha: z.string().min(8),
        confirmeSenha: z.string().min(8),

        cep: z.string()
        .nonempty("Campo obrigatório!"),
        endereco: z.string()
        .nonempty("Campo obrigatório!"),
        numero: z.string()
        .nonempty("Campo obrigatório!"),
        bairro: z.string()
        .nonempty("Campo obrigatório!"),
        cidade: z.string()
        .nonempty("Campo obrigatório!"),
        estado: z.string()
        .nonempty("Campo obrigatório!")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    // funções direto do MUI, para controlar visualização de senha
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };

    // funções para inserção de IMAGEM
    const handleChangeClick = () => {
      inputRef.current.click();
    };
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (x) => {
          setImageProfile(x.target.result)
        }
        reader.readAsDataURL(file)
      }
    };

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // dados para registrar novo usuario, e função de registro
    const dadosRegister = {
      UserName : username,
      Name : nome,
      Telephone : telefone,
      Email : email,
      PasswordHash : senha,
      Role: role,

      Cep : cep,            
      City : cidade,            
      District : bairro,            
      LocationAdress : endereco,            
      LocationNumber : numero,            
      State : estado,            

      ImageProfile : imageProfile,            
    }

    const registerUser = () => {
        if (errors) {
          setModalConteudo("Verifique se todos os campos obrigatórios estão preenchidos")
          setModalAlert(true)
        }
        setLoading(true);
        axiosService.registerService(dadosRegister)
        .then((res) => {
            setModalConteudo("Cadastrado efetuado com sucesso")
            setModalSucess(true)        
        })
        .catch((err) => {
          if (err.response) {
            setModalConteudo(err.response.data)
            setModalError(true)
          } else {
            setModalConteudo("Verifique se o servidor está ativado")
            setModalError(true)
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // função de auto pesquisa de CEP
    const buscaCep = () => {
        getDadosCep(cep)
        .then((res) => {
          setEstado(res.uf)
          setBairro(res.bairro)
          setCidade(res.localidade)
          setEndereco(res.logradouro)
        })
        .catch((err) => {
          setModalError(true)
          setModalConteudo(err)
          console.log(err)
        })
    }

    useEffect(() => {
      console.log(cep.length)
      if (cep.length >= 8) {
        buscaCep()
      }
    }, [cep])

    // funções abaixo formatam a digitação no input
    const formatarTelefone = (telefone) => {
        const cleaned = ('' + telefone).replace(/\D/g, '');
        
        const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }

        return telefone;
    };

    const handleTelefoneChange = (e) => {
        setTelefone(formatarTelefone(e.target.value));
    };

    const formatarCep = (cep) => {
      const cleaned = ('' + cep).replace(/\D/g, '');

      const match = cleaned.match(/^(\d{5})(\d{3})$/);
      if (match) {
          return `${match[1]}-${match[2]}`;
      }

      return cep;
    };

    const handleCepChange = (e) => {
        setCep(formatarCep(e.target.value));
    };

    // multipla funções nos botões de "VOLTAR" e "PRÓXIMO"
    const handleButtonVoltar = () => {
      if (activeStep === 0) {
        window.location.href = '/'
      } else {
        handleBack()
      }
    }

    const handleButtonProximo = () => {
      if (activeStep === 2) {
        registerUser()
      } else {
        handleNext()
      }
    }

    const handleButtonImage = () => {
      if (!imageProfile) {
        handleChangeClick()
      } else {
        setImageProfile("")
      }
    }

    return(
      <>
        {loading && ( 
            <div className="loading-background"> 
                <CircularProgress />
            </div>
        )}
        {modalSucess && (
          <Modal
            onClose={closeModal}
            conteudo={modalConteudo}
            openModal={modalSucess}
            icon={<CheckIcon sx={{ fontSize: 60 }}/>}
            iconColor="#16a34a"
          />
        )}
        {modalAlert && (
          <Modal
            onClose={closeModal}
            title="Alerta"
            conteudo={modalConteudo}
            openModal={modalAlert}
            icon={<AnnouncementIcon sx={{ fontSize: 60 }}/>}
            iconColor="#facc15"
          />
        )}
        {modalError && (
          <Modal
            onClose={closeModal}
            title="Erro ao efetuar o registro"
            conteudo={modalConteudo}
            openModal={modalError}
            icon={<CancelPresentationIcon sx={{ fontSize: 60 }}/>}
            iconColor="#ef4444"
          />
        )}
        <div className="form-register">
          <Stepper 
              activeStep={activeStep}
          >
            {steps.map((label) => {
                const labelProps = {};
                return (
                  <Step key={label}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
            })}
          </Stepper>
          <Form onSubmit={handleSubmit(registerUser)}>
            {activeStep === 0 && (
              <>
                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={nome}
                        register={register("nome")}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu Nome:"
                        label="Nome"
                    />
                    {errors.nome && <span className="message-error">{errors.nome.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={username}
                        register={register("username")}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Digite seu Username:"
                        label="Username"
                    />
                    {errors.username && <span className="message-error">{errors.username.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={email}
                        register={register("email")}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu Email:"
                        label="Email"
                    />
                    {errors.email && <span className="message-error">{errors.email.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={senha}
                        register={register("senha")}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Insira a senha para sua conta:" label="Senha"
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                    />
                    {errors.senha && <span className="message-error">{errors.senha.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={confirmeSenha}
                        register={register("confirmeSenha")}
                        onChange={(e) => setConfirmeSenha(e.target.value)}
                        placeholder="Confirme sua senha:"
                        label="Confirmar senha"
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                    />
                    {confirmeSenha != senha && <span className="message-error">Verifique suas senhas inseridas</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        id="phone_with_ddd"
                        value={telefone}
                        onChange={handleTelefoneChange}
                        placeholder="Digite seu Telefone:"
                        label="Telefone"
                    />
                  </div>

              </>
            )}
            {activeStep === 1 && (
              <>
                  <div className="container-input-span-info">
                    <div className="input-cep">
                      <Input
                          required={true}
                          id="cep"
                          value={cep}
                          register={register("cep")}
                          onChange={handleCepChange}
                          placeholder="Digite seu CEP:"
                          label="CEP"
                      />
                      <a href="">
                        <span className="icon-search"><SearchIcon/></span>
                      </a>
                    </div>
                    {errors.cep && <span className="message-error">{errors.cep.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={endereco}
                        register={register("endereco")}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Digite seu Endereço:"
                        label="Endereço"
                    />
                    {errors.endereco && <span className="message-error">{errors.endereco.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={numero}
                        register={register("numero")}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="Digite seu Número:"
                        label="Número"
                    />
                    {errors.numero && <span className="message-error">{errors.numero.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={bairro}
                        register={register("bairro")}
                        onChange={(e) => setBairro(e.target.value)}
                        placeholder="Digite seu Bairro:"
                        label="Bairro"
                    />
                    {errors.bairro && <span className="message-error">{errors.bairro.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={cidade}
                        register={register("cidade")}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Digite seu Cidade:"
                        label="Cidade"
                    />
                    {errors.cidade && <span className="message-error">{errors.cidade.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        required={true}
                        value={estado}
                        register={register("estado")}
                        onChange={(e) => setEstado(e.target.value)}
                        placeholder="Digite seu Estado:"
                        label="Estado"
                    />
                    {errors.estado && <span className="message-error">{errors.estado.message}</span>}
                  </div>

              </>
            )}
            <div className='container-main'>
              {activeStep === 2 && (
                <>
                  <div className="container-insert-img">
                      <div className="img-input" data-img="" onClick={handleChangeClick}>
                          {/* Parte de colocar foto e colocar um "Sobre Mim" */}
                          {imageProfile ? (
                            <>
                                <img
                                    src={imageProfile}
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
                    </div>
                </>
              )}
              <div className='container-button-group'>
                {activeStep === 2 && (
                  <div className="container-button">
                      <Button
                          type="button"
                          onClick={handleButtonImage}
                          color="transparent"
                          textColor="#3355ff"
                          name={imageProfile ? "Retirar Foto" : "Inserir Imagem"}
                          shadow="1px 2px 36px -11px rgba(51,85,255,1)"
                      />
                  </div>
                )}
                <div className="container-button">
                    <Button
                      type="button"
                      name={activeStep === 0 ? "Voltar ao Login" :  "Voltar"}
                      color="#1f2937"
                      shadow="none"
                      onClick={handleButtonVoltar}
                    />
                    <Button
                      type='button'
                      name={activeStep === 2 ? 'Enviar' : 'Próximo'}
                      onClick={handleButtonProximo}
                    />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
}