import './Input.css'

const Input = (props) => {
    return(
        <div className='input-text'>
            <label>{props.label}</label>
            <input placeholder={props.placeholder} icon={props}/>
        </div>
    )
}

export default Input;