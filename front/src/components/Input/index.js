import './Input.css'

const Input = ({endAdornment, type, id , label, placeholder, register, onChange, value}) => {
    return(
        <div className='input-text'>
            <label>{label}</label>
            <input 
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