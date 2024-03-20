import "./Login.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Form from '../../components/Form';
import axiosService from '../../services/AxiosService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React, { useEffect, useState } from "react";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorLogin, setErrorLogin] = React.useState("");

    const schema = z.object({
        email: z.string()
        .nonempty("Campo obrigatório!")
        .email("Formato de email invalido"),

        password: z.string().min(8),
    });

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const dadosLogin = {
        Email: email,    
        PasswordHash: password
    }

    const loginUser = () => {
        axiosService.loginService(dadosLogin)
        .then((res) => {
            console.log(res)
            const token = "seu_token_aqui";

            // Adicionando o id vindo do BD simulando token ao localStorage
            localStorage.setItem('token', token);
        })
        .catch((err) => {
            setErrorLogin(err.response.data)
        })
    }

    return(
        <>
            <div className="container-login">
                <div className="login">
                    <Form onSubmit={handleSubmit(loginUser)}>
                        <div className="div1-container">
                            <div className="div1">
                                <h1>Faça seu Login</h1>
                                <div class="social-container">
                                    <a href="#" class="social">
                                        <GoogleIcon/>
                                        <p>Entrar com o Google</p>
                                    </a>
                                </div>
                                <Input 
                                    placeholder="Email" 
                                    register={register("email")}  
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <span className="message-error">{errors.email.message}</span>}

                                <Input 
                                    placeholder="Senha"
                                    register={register("password")}
                                    onChange={(e) => setPassword(e.target.value)}  
                                />
                                {errors.password && <span className="message-error">{errors.password.message}</span>}
                                {errorLogin &&(
                                    <>
                                        <span className="message-error">
                                            {errorLogin}
                                        </span> 
                                    </>
                                )}
                                <a href="#">Esqueceu sua senha?</a>
                                <Button type="submit" name="Login"/>
                            </div>
                        </div>
                    </Form>
                    <div className="div2-container">
                        <div className="div2">
                            <div className="overlay-panel overlay-right">
                                <div className="img-container">
                                    <img src="https://pwi.com.br/wp-content/uploads/2023/11/logo-pwi.svg"/>
                                </div>
                                <h1>Seja bem-vindo !</h1>
                                <p>Insira seus dados pessoais e comece sua jornada conosco</p>
                                <a href="users/sign-up">
                                    <Button
                                        name="Cadastre-se"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;