

const Modal = ({score, toggleModal}) => {
    const handleToggle = () => {
        document.body.style.overflow = 'auto';
        toggleModal(false)
    }

    return (
        <div className='modalContainer' onClick={handleToggle}>
            <div className='modalContainerInner'>
                <p className='modalTextHeader'>Cumulative Chance of Live Birth:</p>
                <p className='modalTextScore'>{Math.round(score * 100)}%</p>
                <p className='modalCloseText'>Click anywhere to close</p>
            </div>
        </div>
    )
}

export default Modal