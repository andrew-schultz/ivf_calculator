import React from "react";
import { useState, useEffect } from "react";
import { submitForm } from "../services/api";
import FormInput from "./FormInput";
import Modal from "./Modal";

const Form = () => {
    const [loading, setLoading] = useState(false)
    const [age, setAge] = useState()
    const [weight, setWeight] = useState()
    const [height, setHeight] = useState()
    const [heightFeet, setHeightFeet] = useState()
    const [heightInches, setHeightInches] = useState()
    const [priorIvf, setPriorIvf] = useState()
    const [priorPregnancies, setPriorPregnancies] = useState()
    const [liveBirths, setLiveBirths] = useState(0)
    const [maleFactorInfertility, setMaleFactorInfertility] = useState(false)
    const [endometriosis, setEndometriosis] = useState(false)
    const [tubalFactor, setTubalFactor] = useState(false)
    const [ovulatoryDisorder, setOvulatoryDisorder] = useState(false)
    const [diminishedOvarianReserve, setDiminishedOvarianReserve] = useState(false)
    const [uterineFactor, setUterineFactor] = useState(false)
    const [otherReason, setOtherReason] = useState(false)
    const [unexplainedInfertility, setUnexplianedInfertility] = useState(false)
    const [noReason, setNoReason] = useState(false)
    const [useOwnEggs, setUseOwnEggs] = useState()
    const [score, setScore] = useState()
    const [errors, setErrors] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

    const setterFuncMap = {
        'age': setAge,
        'weight': setWeight,
        'height_feet': setHeightFeet,
        'height_inches': setHeightInches,
        'prior_ivf': setPriorIvf,
        'prior_pregnancies': setPriorPregnancies,
        'live_births': setLiveBirths,
        'use_own_eggs': setUseOwnEggs,
    }

    const radioSetterFuncMap = {
        'male_factor_infertility': setMaleFactorInfertility,
        'endometriosis': setEndometriosis,
        'tubal_factor': setTubalFactor,
        'ovulatory_disorder': setOvulatoryDisorder,
        'diminished_ovarian_reserve': setDiminishedOvarianReserve,
        'uterine_factor': setUterineFactor,
        'other_reason': setOtherReason,
        'unexplained_infertility': setUnexplianedInfertility,
        'no_reason': setNoReason,
    }


    useEffect(() => {
        const hFeet = heightFeet ? heightFeet : 0
        const hInches = heightInches ? heightInches : 0
        const inches = parseInt((hFeet * 12)) + parseInt(hInches)
        setHeight(inches)
    }, [heightFeet, heightInches])

    useEffect(() => {
        if (unexplainedInfertility) {
            resetRadios(false)
            setNoReason(false)
        }
    }, [unexplainedInfertility])

    useEffect(() => {
        if (noReason) {
            resetRadios(false)
            setUnexplianedInfertility(false)
        }
    }, [noReason])

    useEffect(() => {
        if (maleFactorInfertility || endometriosis || tubalFactor || ovulatoryDisorder || diminishedOvarianReserve || uterineFactor || otherReason) {
            setUnexplianedInfertility(false)
            setNoReason(false)
        }
    }, [maleFactorInfertility, endometriosis, tubalFactor, ovulatoryDisorder, diminishedOvarianReserve, uterineFactor, otherReason])

    useEffect(() => {
        if (priorPregnancies < 1) {
            // reset liveBirths to 0 after a user toggles priorPregnancies to None
            setLiveBirths(0)
        }
    }, [priorPregnancies])


    const resetRadios = (val) => {
        setMaleFactorInfertility(val)
        setEndometriosis(val)
        setTubalFactor(val)
        setOvulatoryDisorder(val)
        setDiminishedOvarianReserve(val)
        setUterineFactor(val)
        setOtherReason(val)
    }

    const handleSubmit = async () => {
        setLoading(true)
        setErrors({})

        const data = {
            'age': age,
            'weight': weight,
            'height': height,
            'prior_ivf': priorIvf,
            'prior_pregnancies': priorPregnancies,
            'live_births': liveBirths,
            'male_factor_infertility': maleFactorInfertility,
            'endometriosis': endometriosis,
            'tubal_factor': tubalFactor,
            'ovulatory_disorder': ovulatoryDisorder,
            'diminished_ovarian_reserve': diminishedOvarianReserve,
            'uterine_factor': uterineFactor,
            'other_reason': otherReason,
            'unexplained_infertility': unexplainedInfertility,
            'no_reason': noReason,
            'use_own_eggs': useOwnEggs,
        }

        const resp = await submitForm(data)

        if (resp['score']) {
            setScore(resp['score'])
            setModalOpen(true)
        }
        else {
            const errors = resp
            if (reasonErrors()) {
                errors['reasonError'] = true
            }
            setErrors(errors)
        }
        setLoading(false)
    }

    const resetForm = () => {
        Object.values(setterFuncMap).forEach(val => {
            console.log(val)
            if (val == setLiveBirths) {
                // reset live births back to its default of 0
                setLiveBirths(0)
            } else {
                val('')
            }
        })
        Object.values(radioSetterFuncMap).forEach(val => {
            console.log(val)
            val(false)
        })
        setScore('')
        setErrors({})
    }

    const handleInputChange = (e) => {
        const val = e.target.value
        console.log(e.target.name, val)
        const setter = setterFuncMap[e.target.name]
        setter(val)
    }

    const handleRadioChange = (e) => {
        const setter = radioSetterFuncMap[e.target.name]
        const val = e.target.value
        let formatted_val;
        if (val === 'true') {
            formatted_val = false
        } else {
            formatted_val = true
        }
        setter(formatted_val)
    }

    const reasonErrors = () => {
        // any 1 "radioReason" being true is enough for this group to pass
        const radioReasons = (
            maleFactorInfertility ||
            endometriosis ||
            tubalFactor ||
            ovulatoryDisorder ||
            diminishedOvarianReserve ||
            uterineFactor ||
            otherReason
        )
        
        // 1 of radioReasons, noReason, or unexplainedInfertility must be true
        if (radioReasons || noReason || unexplainedInfertility) {
            return false
        }

        return true
    }

    return(
        <div className='formContainer'>
            <div className='formTitle'>
                IVF Success Calculator
            </div>
            <div className='formSection'>
                <div className='formSectionHeader'>
                    Background and History
                </div>
                <FormInput
                    labelText={'How old are you?'}
                    inputType={'number'}
                    inputName={'age'}
                    placeholderText={'Enter age between 20 and 50 years'}
                    inputVal={age}
                    onChangeHandler={handleInputChange}
                    errorText={`Input is outside of range needed for estimation.\nPlease enter an age between 20 and 50 years.`}
                    showError={errors['age']}
                    minVal={20}
                    maxVal={50}
                />
                <FormInput
                    labelText={'How much do you weigh?'}
                    inputType={'number'}
                    inputName={'weight'}
                    placeholderText={'Enter weight between 80-300 lbs'}
                    inputVal={weight}
                    onChangeHandler={handleInputChange}
                    errorText={`Input is outside of range needed for estimation.\nPlease enter a weight between 80 and 300 lbs.`}
                    showError={errors['weight']}
                    minVal={80}
                    maxVal={300}
                />
                <div className='formInputContainer'>
                    <label className='formInputLabel'>How tall are you?</label>
                    <input 
                        className='formInput half left' 
                        type='number' 
                        name='height_feet' 
                        placeholder='feet' 
                        value={heightFeet}
                        onChange={handleInputChange} />
                    <input 
                        className='formInput half' 
                        type='number' 
                        name='height_inches' 
                        placeholder='inches' 
                        value={heightInches}
                        onChange={handleInputChange} />
                    {errors['height'] ? (
                        <p className="errorText">Required - Input is outside of range needed for estimation.</p>
                    ) : null}
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel'>How many times have you used IVF in the past (include all cycles, even those not resulting in pregnancy)?</label>
                    <select 
                        className='formInput dropdown' 
                        name='prior_ivf' 
                        placeholder='Select an option'
                        value={priorIvf}
                        onChange={handleInputChange}
                    >
                        <option >Select an option</option>
                        <option selected={priorIvf == '0' ? true : false} value="0">I've never used IVF</option>
                        <option selected={priorIvf == '1' ? true : false} value="1">1</option>
                        <option selected={priorIvf == '2' ? true : false} value="2">2</option>
                        <option selected={priorIvf == '3' ? true : false} value="3">3 or more</option>
                    </select>
                    {errors['prior_ivf'] ? (
                        <p className="errorText leftMargin">Required</p>
                    ) : null}
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel'>How many prior pregnancies have you had?</label>
                    <select 
                        className='formInput dropdown' 
                        name='prior_pregnancies' 
                        placeholder='Select an option'
                        value={priorPregnancies}
                        onChange={handleInputChange}
                    >
                        <option >Select an option</option>
                        <option selected={priorPregnancies == '0' ? true : false} value="0">None</option>
                        <option selected={priorPregnancies == '1' ? true : false} value="1">1</option>
                        <option selected={priorPregnancies == '2' ? true : false} value="2">2 or more</option>
                    </select>
                    {errors['prior_pregnancies'] ? (
                        <p className="errorText leftMargin">Required</p>
                    ) : null}
                </div>
                
                {priorPregnancies && priorPregnancies > 0 ? (
                    <div className='formInputContainer'>
                        {/* hidden unless the value of the prior_pregnancies select is 1 or 2, then its visible and required */}
                        <label className='formInputLabel'>How many prior births have you had?</label>
                        <select 
                            className='formInput dropdown' 
                            name='live_births' 
                            placeholder='Select an option'
                            value={liveBirths}
                            onChange={handleInputChange}
                        >
                            <option >Select an option</option>
                            <option selected={liveBirths == '0' ? true : false} value="0">None</option>
                            <option selected={liveBirths == '1' ? true : false} value="1">1</option>
                            {priorPregnancies && priorPregnancies > 1 ? (
                                <option selected={liveBirths == '2' ? true : false} value="2">2 or more</option>
                            ) : null }
                        </select>
                        {errors['live_births'] ? (
                            <p className="errorText leftMargin">Required</p>
                        ) : null}
                    </div>
                ) : null}
            </div>

            <div className='formSection right'>
                <div className='formSectionHeader'>
                    Diagnosis and Plan
                </div>
                <div className='formInputContainer'>
                    <p className='formInputSubHeader'>What is the reason you are using IVF? (select all that apply)</p>
                    {errors['reasonError'] || errors['reason_error'] ? (
                        <p className='errorText'>Required</p>
                    ) : null }
                </div>
                <div className='formRadioInputContainer'>    
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='male_factor_infertility'
                        value={maleFactorInfertility}
                        checked={maleFactorInfertility}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Male Factor Infertility</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='endometriosis' 
                        value={endometriosis}
                        checked={endometriosis}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Endometriosis</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='tubal_factor' 
                        value={tubalFactor}
                        checked={tubalFactor}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Tubal Factor</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='ovulatory_disorder' 
                        value={ovulatoryDisorder}
                        checked={ovulatoryDisorder}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Ovulatory Disorder</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='diminished_ovarian_reserve' 
                        value={diminishedOvarianReserve}
                        checked={diminishedOvarianReserve}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Diminished Ovarian Reserve</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='uterine_factor' 
                        value={uterineFactor}
                        checked={uterineFactor}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Uterine Factor</label>
                </div>
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='other_reason' 
                        value={otherReason}
                        checked={otherReason}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Other reason</label>
                </div>

                <p className='formOrDivider'>(Or)</p>
                
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='unexplained_infertility' 
                        value={unexplainedInfertility}
                        checked={unexplainedInfertility}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>Unexplained (Idiopathic) infertility</label>
                </div>

                <p className='formOrDivider'>(Or)</p>
                
                <div className='formRadioInputContainer'>
                    <input 
                        className='formRadioInput' 
                        type='radio' 
                        name='no_reason' 
                        value={noReason}
                        checked={noReason}
                        onClick={handleRadioChange}
                    />
                    <label className='formInputLabel radio'>I don’t know / no reason</label>
                </div>

                <div className='formInputContainer'>
                    <label className='formInputLabel'>Do you plan to use your own eggs or donor eggs?</label>
                    <select 
                        className='formInput dropdown' 
                        name='use_own_eggs' 
                        placeholder='Select an option'
                        value={useOwnEggs}
                        onChange={handleInputChange}
                    >
                        <option >Select an option</option>
                        <option selected={useOwnEggs == true ? true : false} value="true">My own eggs</option>
                        <option selected={useOwnEggs == false ? true : false} value="false">Donor eggs</option>
                    </select>
                    {errors['use_own_eggs'] ? (
                        <p className='errorText leftMargin'>Required</p>
                    ) : null}
                </div>
            </div>
            <div className='formButtonsContainer'>
                <div className='formButtonContainer'>
                    <div className='formButton submit' onClick={handleSubmit}>
                        <p className='formButtonText'>Calculate Success</p>
                    </div>
                </div>
                <div className='formButtonContainer'>
                    <div className='formButton reset' onClick={resetForm}>
                        <p className='formButtonText'>Start Over</p>
                    </div>
                </div>
            </div>
            {score && modalOpen ? (
                // <div className='resultsContainer'>
                //     <p>{score ? score * 100 : ''}</p>
                // </div>
                <Modal score={score} toggleModal={setModalOpen}></Modal>
            ): null}
            
        </div>
    )
}


export default Form
