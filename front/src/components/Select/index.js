import './Select.css'

const Select = (props) => {
    return(
        <div className='dropdown-list'>
            <label>{props.label}</label>
            
            <select>
                {props.map(
                    <option>
                        {props}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Select;