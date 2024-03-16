import './Button.css'

const Button = (props) => {
    return(
        <div className='botao'>
            <a href={props.href}>
                <button disabled={props.disabled} style={{ backgroundColor: props.color, boxShadow: props.shadow }}>
                    {props.name}
                </button>
            </a>
        </div>
    )
}

export default Button;