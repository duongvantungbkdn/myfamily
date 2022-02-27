import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react';
import { DataContext } from '../../contexts/DataContext';

const EditDataModal = ({data}) => {
    // take props from useContext
    const {
        editData,
        getDatas,
        showEditDataModal,
        setShowEditDataModal,
        setShowToastMessage
    } = useContext(DataContext)    

    // initial value
    const [editedData,setEditedData] = useState(data)

    // useEffect to watching chosen data
    useEffect(() => setEditedData(data),[data])

    const {title,description,url,date,location} = editedData

    //onChange EditDataForm
    const onChangeEditData = event => {
        setEditedData({...editedData, [event.target.name]: event.target.value})
    }

    //handle edit data
    const onSubmit = async event => {
        event.preventDefault()
        const {success,message} = await editData(editedData)
        getDatas()
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
        closeModal()
    }

    //close edit modal
    const closeModal = () => {
        setShowEditDataModal(false)
        setEditedData(data)
    }

    return (
        <>
            <Modal show={showEditDataModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>You are editting {data.title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='title' 
                            required 
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeEditData}
                        />
                        <Form.Text id='title-help' muted>Title is required</Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='url'
                            required
                            onChange={onChangeEditData}
                            value={url}
                        />
                        <Form.Text muted>Link URL Youtube is required</Form.Text>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='date' 
                            name='date'
                            value={date}
                            onChange={onChangeEditData}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            name='location'
                            value={location}
                            onChange={onChangeEditData}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as='textarea' 
                            row={3} 
                            name='description'
                            onChange={onChangeEditData}
                            value={description}
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

export default EditDataModal;

