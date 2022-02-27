import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { DataContext } from '../../contexts/DataContext'


const CreateDataModal = () => {
    const {
        showCreateDataModal,
        setShowCreateDataModal,
        createNewData,
        setShowToastMessage,
        getDatas
    } = useContext(DataContext)

    // useState new data
    const [newData,setNewData] = useState(
        {
            title: '',
            description: '',
            url: '',
            date: null,
            location: ''
        }
    )

    const { title,description,url,date,location } = newData

    // onchange add data modal
    const onChangeNewData = event => {
        setNewData({...newData, [event.target.name]: event.target.value})
    }

    const closeModal = () => {
        setNewData({title:'',description:'',url:'',date: null, location: ''})
        setShowCreateDataModal(false)
    }

    // submit create new data form
    const onSubmit = async event => {
        event.preventDefault()
        const { success,message } = await createNewData(newData)
        getDatas()
        closeModal()
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
    }

    return (
        <Modal show={showCreateDataModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to post?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control 
                            type='text' 
                            placeholder='Title' 
                            name='title' 
                            required 
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewData}
                        />
                        <Form.Text id='title-help' muted>Title is required</Form.Text>
                    </Form.Group>

                    <Form.Group className='mt-3 mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter url' 
                            aria-describedby='url-help'
                            required
                            name='url'
                            value={url}
                            onChange={onChangeNewData}
                        />
                        <Form.Text id='url-help' muted>Link URL Youtube is required</Form.Text>
                    </Form.Group>

                    <Form.Group className='mt-3 mb-3' controlId='date'>
                        <Form.Control 
                            type='date' 
                            placeholder='Date you record video' 
                            name='date'
                            value={date}
                            onChange={onChangeNewData}
                        />
                    </Form.Group>

                    <Form.Group className='mt-3 mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Records at (location)' 
                            name='location'
                            value={location}
                            onChange={onChangeNewData}
                        />
                    </Form.Group>

                    <Form.Group className='mt-3 mb-3'>
                        <Form.Control 
                            as='textarea' row={3} 
                            placeholder='Description' 
                            name='description'
                            value={description}
                            onChange={onChangeNewData}
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

export default CreateDataModal

