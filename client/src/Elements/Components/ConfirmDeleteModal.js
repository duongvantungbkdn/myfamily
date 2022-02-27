import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const ConfirmDeleteModal = ({data}) => {
    // take props from useContext
    const {
        deleteData,
        deleteDataAdm,
        showConfirmDeleteModal,
        setShowConfirmDeleteModal,
        setShowToastMessage
    } = useContext(DataContext)

    //handle delete data
    const handleDeleteData = async id => {
        const {message,success} = await deleteData(id)
        setShowConfirmDeleteModal(false)
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
    }

    return (
        <>
            <Modal 
                show={showConfirmDeleteModal}
                onHide={() => setShowConfirmDeleteModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {data.title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure delete {data.title}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='danger'
                       onClick={() => handleDeleteData(data._id)}
                    >Delete</Button>
                    <Button 
                        variant='secondary' 
                       onClick={() => setShowConfirmDeleteModal(false)}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ConfirmDeleteModal;

