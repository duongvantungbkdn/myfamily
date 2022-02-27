import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react';
import { ConfigAppContext } from '../../contexts/ConfigAppContext';

const EditConfigModal = () => {
    // take props from useContext
    const {
        configAppState,
        editConfig,
        getConfigApp,
        showEditConfigModal,
        setShowEditConfigModal,
        setShowToastMessage
    } = useContext(ConfigAppContext)    

    useEffect(() => getConfigApp(),[])

    // initial value 
    const [ editedConfig, setEditedConfig ] = useState(configAppState)

    const { PhoneNumber, EmailAddress, MemFamilyName } = editedConfig

    //onChange EditConfigForm
    const onChangeEditConfig = event => {
        setEditedConfig({...editedConfig, [event.target.name]: event.target.value})
    }

    //handle edit config value
    const onSubmit = async event => {
        event.preventDefault()
        const {success,message} = await editConfig(editedConfig)
        getConfigApp()
        // setShowToastMessage({show:true,message,type: success?'success':'danger'})
        closeModal()
    }

    //close edit modal
    const closeModal = () => {
        setShowEditConfigModal(false)
        setEditedConfig(configAppState)
    }

    return (
        <>
            <Modal show={showEditConfigModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>You are editting Config value</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='PhoneNumber' 
                            placeholder='Enter PhoneNumber'
                            value={PhoneNumber}
                            onChange={onChangeEditConfig}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='EmailAddress'
                            placeholder='Enter EmailAddress'
                            onChange={onChangeEditConfig}
                            value={EmailAddress}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='MemFamilyName'
                            placeholder='Example: Dad:Dad name:Mom:Mom name:First Child:First child name:Second Child:Second child name...'
                            value={MemFamilyName}
                            onChange={onChangeEditConfig}
                        />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit'>Update</Button>
                    <Button variant='secondary' onClick={closeModal}>Cancel</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
};

export default EditConfigModal;

