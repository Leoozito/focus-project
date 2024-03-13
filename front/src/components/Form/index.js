import Button from '../Button';
import Input from '../Input';
import './Form.css'

const Form = () => {
    return(    
        <section className="formulario">
            <form>
                <Input label="Nome" placeholder="Digite seu nome:"/>
                <Input label="Email" placeholder="Digite seu email:"/>
                <Input label="CEP" placeholder="Digite seu CEP:"/>
                <Button descricao="Enviar"/>
            </form>
        </section>
    )
};

export default Form;