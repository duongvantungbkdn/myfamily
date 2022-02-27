import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const ConfirmRemoveModal = ({data}) => {
    // take props from useContext
    const {
        removeData,
        showConfirmRemoveModal,
        setShowConfirmRemoveModal,
        setShowToastMessage
    } = useContext(DataContext)

    //handle delete data
    const handleRemoveData = async id => {
        const {message,success} = await removeData(id)
        setShowConfirmRemoveModal(false)
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
    }

    return (
        <>
            <Modal 
                show={showConfirmRemoveModal}
                onHide={() => setShowConfirmRemoveModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove {data&&data.title} forever</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure remove {data&&data.title} forever? If Remove, data can not restore.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='danger'
                        onClick={() => handleRemoveData(data._id)}
                    >Remove</Button>
                    <Button 
                        variant='secondary' 
                        onClick={() => setShowConfirmRemoveModal(false)}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ConfirmRemoveModal;

