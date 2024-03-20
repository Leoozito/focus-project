import Button from '../Button';
import Input from '../Input';
import './Form.css'

const Form = ({onSubmit, children}) => {
    return(    
        <section className="formulario">
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </section>
    )
};

export default Form;