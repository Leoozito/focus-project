import './Modal.css'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Modal = ({title, conteudo, openModal, icon, iconColor, onClose}) => {
    console.log(openModal)

    return (
        <>
            {openModal && (
                <>
                    <div className="container-modal-overlay">
                        <div className='container-modal'>
                            <div className="container-modal-close">
                                <a onClick={onClose}>
                                    <HighlightOffIcon/>
                                </a>
                            </div>
                            <div className='container-modal-title'>
                                <h1>{title}</h1>
                            </div>
                            <div className="container-modal-content">
                                <span style={{color: iconColor}}>
                                    {icon}
                                </span>
                                <p>{conteudo}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )    
}

export default Modal;