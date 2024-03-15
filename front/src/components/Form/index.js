import Button from '../Button';
import Input from '../Input';
import './Form.css'

const Form = (props) => {
    return(    
        <section className="formulario">
            <form>
                {props.children}
                <Button descricao="Enviar"/>
            </form>
        </section>
    )
};

export default Form;