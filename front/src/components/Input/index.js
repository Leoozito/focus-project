import './Input.css'

const Input = ({disabled, endAdornment, type, id , label, placeholder, register, onChange, value, required, onBlur}) => {
    
    console.log(value)
    return(
        <div className='input-text'>
            <div className="label">
                <label>{label}</label>
                {required && (
                    <span>*</span>
                )}
            </div>
            <input 
                required={required}
                disabled={disabled}
                endAdornment={endAdornment}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder} 
                {...register}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    )
}

export default Input;