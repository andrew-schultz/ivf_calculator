const FormRadioInput = ({inputName, inputVal, clickHandler, labelText}) => {
    return (
        <div className='formRadioInputContainer'>    
            <input 
                className='formRadioInput' 
                type='radio' 
                name={inputName}
                value={inputVal}
                checked={inputVal}
                onClick={clickHandler}
            />
            <label className='formInputLabel radio'>{labelText}</label>
        </div>
    )
}

export default FormRadioInput