import './Button.css'

const Button = (props) => {
    return(
        <div className='botao'>
            {/* <a href={props.href}> */}
            <button 
                type="button"
                disabled={props.disabled} 
                style={{ backgroundColor: props.color, boxShadow: props.shadow, color: props.textColor }} 
                onClick={props.onClick}
            >
                {props.name}
            </button>
            {/* </a> */}
        </div>
    )
}

export default Button;