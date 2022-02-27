import { useContext } from 'react';
import Toast from 'react-bootstrap/Toast'
import { DataContext } from '../../contexts/DataContext';

const ToastMessage = () => {
    // take props from useContext
    const {
        showToastMessage: {show,message,type},
        setShowToastMessage
    } = useContext(DataContext)

    return (
        <Toast 
            show={show}
            style={{position: 'fixed', top: '15%', right: '10px'}}
            className={`bg-${type} text-white`}
            onClose={() => 
                setShowToastMessage({show: false,message:'',type:null})
            }
            delay={5000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
    )
};

export default ToastMessage;

