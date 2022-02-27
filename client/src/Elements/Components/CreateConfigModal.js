import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { ConfigAppContext } from '../../contexts/ConfigAppContext'
import { DataContext } from '../../contexts/DataContext'


const CreateConfigModal = () => {
    const {
        configAppState,
        showCreateConfigModal,
        setShowCreateConfigModal,
        createConfig,
        getConfigApp
    } = useContext(ConfigAppContext)

    // innitial config app
    const [newConfig,setNewConfig] = useState(
        {
            PhoneNumber: '',
            EmailAddress: '',
            MemFamilyName: ''
        }
    )

    const {
        PhoneNumber,
        EmailAddress,
        MemFamilyName
        } = newConfig

    // onchange config app modal
    const onChangeConfigApp = event => {
        setNewConfig({...newConfig, [event.target.name]: event.target.value})
    }

    const closeModal = () => {
        setNewConfig({PhoneNumber:'',EmailAddress:'',MemFamilyName:''})
        setShowCreateConfigModal(false)
    }

    // submit create new data form
    const onSubmit = async event => {
        event.preventDefault()
        const { success,message } = await createConfig(newConfig)
        getConfigApp()
        closeModal()
    }

    return (
        <Modal show={showCreateConfigModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>You are creatting ConfigApp</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='PhoneNumber' 
                            placeholder='Enter PhoneNumber'
                            value={PhoneNumber}
                            onChange={onChangeConfigApp}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='EmailAddress'
                            placeholder='Enter EmailAddress'
                            onChange={onChangeConfigApp}
                            value={EmailAddress}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='MemFamilyName'
                            placeholder='Enter FamilyName'
                            value={MemFamilyName}
                            onChange={onChangeConfigApp}
                        />
                    </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={closeModal}>Cancel</Button>
                    <Button variant='primary' type='submit'>Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default CreateConfigModal

