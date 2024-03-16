import "./Login.css"
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import Input from '../../components/Input'
import Button from '../../components/Button'

const Login = () => {
    return(
        <>
            <div className="login">
                <div className="div1-container">
                    <div className="div1">
                        <h1>Faça seu Login</h1>
                        <div class="social-container">
                            <a href="#" class="social">
                                <GoogleIcon/>
                                <p>Entrar com o Google</p>
                            </a>
                        </div>
                        <Input placeholder="Email"/>
                        <Input placeholder="Senha"/>
                        <a href="#">Esqueceu sua senha?</a>
                        <Button name="Login"/>
                    </div>
                </div>
                <div className="div2-container">
                    <div className="div2">
                        <div className="overlay-panel overlay-right">
                            <div className="img-container">
                                <img src="https://pwi.com.br/wp-content/uploads/2023/11/logo-pwi.svg"/>
                            </div>
                            <h1>Seja bem-vindo !</h1>
                            <p>Insira seus dados pessoais e comece sua jornada conosco</p>
                            <Button name="Cadastre-se" href="/users/sign-up"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;