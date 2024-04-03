import './Input.css'
import {forwardRef} from 'react'

const Input = forwardRef(({disabled, endAdornment, type, id , label, placeholder, onChange, value, required, onBlur, ...rest}, ref) => {
    
    console.log("VALUE COMPONENT INPUT: ",value)

    return(
        <div className='input-text'>
            <div className="label">
                <label>{label}</label>
                {required && (
                    <span>*</span>
                )}
            </div>
            <input 
                ref={ref}
                {...rest}
                required={required}
                disabled={disabled}
                endAdornment={endAdornment}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder} 
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
});
export default Input;