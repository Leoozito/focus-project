import './Button.css'

const Button = (props) => {
    return(
        <div className='botao'>
            <a href={props.href}>
                <button>{props.name}</button>
            </a>
        </div>
    )
}

export default Button;