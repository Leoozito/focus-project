import './Button.css'

const Button = (props) => {
    return(
        <div className='botao'>
            <button>{props.descricao}</button>
        </div>
    )
}

export default Button;