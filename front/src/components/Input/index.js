import './Input.css'

const Input = ({disabled, endAdornment, type, id , label, placeholder, register, onChange, value}) => {
    return(
        <div className='input-text'>
            <label>{label}</label>
            <input 
                disabled={disabled}
                endAdornment={endAdornment}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder} 
                {...register}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;