import React from "react";
import { useState, useEffect } from "react";
import { submitForm } from "../services/api";

const Form = () => {
    const [loading, setLoading] = useState(false)
    const [age, setAge] = useState()
    const [weight, setWeight] = useState()
    const [height, setHeight] = useState()
    const [heightFeet, setHeightFeet] = useState()
    const [heightInches, setHeightInches] = useState()
    const [priorIvf, setPriorIvf] = useState()
    const [priorPregnancies, setPriorPregnancies] = useState()
    const [liveBirths, setLiveBirths] = useState()
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

    const setterFuncMap = {
        'age': setAge,
        'weight': setWeight,
        'height_feet': setHeightFeet,
        'height_inches': setHeightInches,
        'prior_ivf': setPriorIvf,
        'prior_pregnancies': setPriorPregnancies,
        'live_births': setLiveBirths,
        'male_factor_infertility': setMaleFactorInfertility,
        'endometriosis': setEndometriosis,
        'tubal_factor': setTubalFactor,
        'ovulatory_disorder': setOvulatoryDisorder,
        'diminished_ovarian_reserve': setDiminishedOvarianReserve,
        'uterine_factor': setUterineFactor,
        'other_reason': setOtherReason,
        'unexplained_infertility': setUnexplianedInfertility,
        'no_reason': setNoReason,
        'use_own_eggs': setUseOwnEggs,
    }


    useEffect(() => {
        const hFeet = heightFeet ? heightFeet : 0
        const hInches = heightInches ? heightInches : 0
        const inches = parseInt((hFeet * 12)) + parseInt(hInches)
        setHeight(inches)
    }, [heightFeet, heightInches])

    const handleSubmit = async () => {
        setLoading(true)
        console.log('submit')
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
        console.log(resp)
        // debugger
        setLoading(false)
    }

    const resetForm = () => {
        Object.values(setterFuncMap).forEach(val => {
            console.log(val)
            val('')
        })
    }

    const handleInputChange = (e) => {
        const val = e.target.value
        const setter = setterFuncMap[e.target.name]
        setter(val)
    }

    return(
        <div className='formContainer'>
            <div className='formSection'>
                <div className='formSectionHeader'>
                    Background and History
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='age'>How old are you?</label>
                    <input 
                        className='formInput'
                        type='number'
                        name='age'
                        placeholder='Enter age between 20 and 50 years'
                        min='20'
                        max='50'
                        value={age} 
                        onChange={handleInputChange} />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='weight'>How much do you weigh?</label>
                    <input 
                        className='formInput' 
                        type='number' 
                        name='weight' 
                        placeholder='Enter weight between 80-300 lbs'
                        min='80'
                        max='300'
                        value={weight} 
                        onChange={handleInputChange} />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='height'>How tall are you?</label>
                    <input 
                        className='formInput' 
                        type='number' 
                        name='height_feet' 
                        placeholder='feet' 
                        value={heightFeet}
                        onChange={handleInputChange} />
                    <input 
                        className='formInput' 
                        type='number' 
                        name='height_inches' 
                        placeholder='inches' 
                        value={heightInches}
                        onChange={handleInputChange} />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='prior_ivf'>How many times have you used IVF in the past (include all cycles, even those not resulting in pregnancy)?</label>
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
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='prior_pregnancies'>How many prior pregnancies have you had?</label>
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
                </div>
                
                <div className='formInputContainer'>
                    {/* hidden unless the value of the prior_pregnancies select is 1 or 2, then its visible and required */}
                    <label className='formInputLabel' for='live_births'>How many prior births have you had?</label>
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
                        <option selected={liveBirths == '2' ? true : false} value="2">2 or more</option>
                    </select>
                </div>
            </div>
            <div className='formSection'>
                <div className='formSectionHeader'>
                    Diagnosis and Plan
                </div>
                <div className='formInputContainer'>
                    <p>What is the reason you are using IVF? (select all that apply)</p>
                </div>
                <div className='formInputContainer'>    
                    <label className='formInputLabel' for='male_factor_infertility'>Male Factor Infertility</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='male_factor_infertility'
                        value={maleFactorInfertility}
                        checked={maleFactorInfertility}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='endometriosis'>Endometriosis</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='endometriosis' 
                        value={endometriosis}
                        checked={endometriosis}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='tubal_factor'>Tubal Factor</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='tubal_factor' 
                        value={tubalFactor}
                        checked={tubalFactor}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='ovulatory_disorder'>Ovulatory Disorder</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='ovulatory_disorder' 
                        value={ovulatoryDisorder}
                        checked={ovulatoryDisorder}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='diminished_ovarian_reserve'>Diminished Ovarian Reserve</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='diminished_ovarian_reserve' 
                        value={diminishedOvarianReserve}
                        checked={diminishedOvarianReserve}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='uterine_factor'>Uterine Factor</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='uterine_factor' 
                        value={uterineFactor}
                        checked={uterineFactor}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='other_reason'>Other reason</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='other_reason' 
                        value={otherReason}
                        checked={otherReason}
                        onChange={handleInputChange}
                    />
                </div>

                <p>(OR)</p>
                
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='unexplained_infertility'>Unexplained (Idiopathic) infertility</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='unexplained_infertility' 
                        value={unexplainedInfertility}
                        checked={unexplainedInfertility}
                        onChange={handleInputChange}
                    />
                </div>

                <p>(OR)</p>
                
                <div className='formInputContainer'>
                    <label className='formInputLabel' for='no_reason'>I don’t know/no reason</label>
                    <input 
                        className='formInput' 
                        type='radio' 
                        name='no_reason' 
                        value={noReason}
                        checked={noReason}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='formInputContainer'>
                    <label className='formInputLabel' for='use_own_eggs'>Do you plan to use your own eggs or donor eggs?</label>
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
                </div>
            </div>
            <div className='formButtonsContainer'>
                <div className='formButtonSubmit' onClick={handleSubmit}>
                    <p>Calculate Success</p>
                </div>
                <div className='formButtonReset' onClick={resetForm}>
                    <p>Start Over</p>
                </div>
            </div>
        </div>
    )
}


export default Form
