// import React from "react";

const FormInput = ({
    labelText,
    inputType,
    inputName,
    placeholderText,
    inputVal,
    onChangeHandler,
    errorText,
    showError,
    minVal, // optional
    maxVal, // optional
}) => {
    return (
        <div className='formInputContainer'>
            <label className='formInputLabel'>{labelText}</label>
            <input 
                className='formInput'
                type={inputType}
                name={inputName}
                placeholder={placeholderText}
                min={minVal}
                max={maxVal}
                value={inputVal} 
                onChange={onChangeHandler} />
            {showError ? (
                <p className="errorText">{errorText}</p>
            ) : null}    
        </div>
    )
}

export default FormInput