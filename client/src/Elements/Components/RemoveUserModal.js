import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react';
import { DataContext } from '../../contexts/DataContext';

const RemoveUserModal = ({user}) => {
    // take props from useContext
    const {
        removeUser,
        showRemoveUserModal,
        setShowRemoveUserModal,
        setShowToastMessage
    } = useContext(DataContext)

    //handle delete User
    const handleRemoveUser = async id => {
        const {message,success} = await removeUser(id)
        setShowRemoveUserModal(false)
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
    }

    return (
        <>
            <Modal 
                show={showRemoveUserModal}
                onHide={() => setShowRemoveUserModal(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Remove {user&&user.username} forever</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure remove <b>{user&&user.username}</b> forever? If Remove, <b>{user&&user.username}</b> can not restore.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant='danger'
                        onClick={() => handleRemoveUser(user._id)}
                    >Remove</Button>
                    <Button 
                        variant='secondary' 
                        onClick={() => setShowRemoveUserModal(false)}
                    >Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default RemoveUserModal;

