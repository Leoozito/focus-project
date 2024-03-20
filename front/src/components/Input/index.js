import './Input.css'

const Input = ({label, placeholder, register, onChange}) => {
    return(
        <div className='input-text'>
            <label>{label}</label>
            <input 
                placeholder={placeholder} 
                {...register}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;