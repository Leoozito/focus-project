import {useRef, useState, useEffect} from 'react';
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

const steps = ['Informações de dados cadastrais', 'Informações de localidade', 'Complementação'];

export default function HorizontalLinearStepper() {
    // variaveis das divisões de tela
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());

    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmeSenha, setConfirmeSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState(0);
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const handleChangeClick = () => {
      inputRef.current.click();
    };
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setImageProfile(file);
    };

    const isStepSkipped = (step) => {
      return skipped.has(step);
    };

    const handleNext = () => {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

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
        console.log("ALOO")
        axiosService.registerService(dadosRegister)
        .then((res) => {
            console.log(res)
            setEstado(res.uf)
        })
        .catch((err) => {
          setErrorRegister(err.response.data)
        })
    }

    useEffect(() => {
      if (cep.length == 8) {
        getDadosCep(cep)
        .then((res) => {
          console.log("DADOS",res)
        })
        .catch((err) => {
          
        })
      }
    }, [cep])

    return (
      <>
        <div className="form-register">
          <Stepper 
              activeStep={activeStep}
          >
            {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
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
                        register={register("nome")}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu Nome:"
                        label="Nome"
                    />
                    {errors.nome && <span className="message-error">{errors.nome.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("username")}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Digite seu Username:"
                        label="Username"
                    />
                    {errors.username && <span className="message-error">{errors.username.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("email")}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu Email:"
                        label="Email"
                    />
                    {errors.email && <span className="message-error">{errors.email.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("senha")}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Insira a senha para sua conta:" label="Senha"
                    />
                    {errors.senha && <span className="message-error">{errors.senha.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("confirmeSenha")}
                        onChange={(e) => setConfirmeSenha(e.target.value)}
                        placeholder="Confirme sua senha:"
                        label="Confirmar senha"
                    />
                    {confirmeSenha != senha && <span className="message-error">Verifique suas senhas inseridas</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="Digite seu Telefone:"
                        label="Telefone"
                    />
                  </div>

              </>
            )}
            {activeStep === 1 && (
              <>
                  <div className="input-cep">
                    <Input
                        register={register("cep")}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="Digite seu CEP:"
                        label="CEP"
                    />
                    <span className="icon-search"><SearchIcon/></span>
                  </div>
                  {errors.cep && <span className="message-error">{errors.cep.message}</span>}

                  <div className="container-input-span-info">
                    <Input
                        register={register("endereco")}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Digite seu Endereço:"
                        label="Endereço"
                    />
                    {errors.endereco && <span className="message-error">{errors.endereco.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("numero")}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="Digite seu Número:"
                        label="Número"
                    />
                    {errors.numero && <span className="message-error">{errors.numero.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("bairro")}
                        onChange={(e) => setBairro(e.target.value)}
                        placeholder="Digite seu Bairro:"
                        label="Bairro"
                    />
                    {errors.bairro && <span className="message-error">{errors.bairro.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
                        register={register("cidade")}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Digite seu Cidade:"
                        label="Cidade"
                    />
                    {errors.cidade && <span className="message-error">{errors.cidade.message}</span>}
                  </div>

                  <div className="container-input-span-info">
                    <Input
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
              <div className="container-insert-img">
                {activeStep === 2 && (
                  <>
                    <div className="img-input" data-img="" onClick={handleChangeClick}>
                        {/* Parte de colocar foto e colocar um "Sobre Mim" */}
                        {imageProfile ? (
                          <>
                              <img
                                  src={URL.createObjectURL(imageProfile)}
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
                  </>
                )}
              </div>
              <div className='container-button-group'>
                {activeStep === 2 && (
                  <div className="container-button">
                      <Button
                          onClick={handleChangeClick}
                          color="transparent"
                          textColor="#3355ff"
                          name={`${imageProfile ? ("Retirar Foto") : ("Inserir Imagem") }`}
                          shadow="1px 2px 36px -11px rgba(51,85,255,1)"
                      />
                  </div>
                )}
                <div className="container-button">
                    <Button
                        type="button"
                        name="Voltar"
                        color="#1f2937"
                        shadow="none"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    />
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="subnit"
                        name='Enviar'
                      />
                    ) : (
                      <Button
                        type='button'
                        name='Próximo'
                        onClick={handleNext}
                      />
                    )}
                </div>
              </div>
            </div>
          </Form>
        </div>
      </>
    );
}