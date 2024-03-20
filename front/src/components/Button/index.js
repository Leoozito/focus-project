import './Button.css'

const Button = (props) => {
    return(
        <div className='botao'>
                <button 
                    type={props.type}
                    disabled={props.disabled} 
                    style={{ backgroundColor: props.color, boxShadow: props.shadow, color: props.textColor }} 
                    onClick={props.onClick}
                >
                    {props.name}
                </button>
        </div>
    )
}

export default Button;