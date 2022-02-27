import { Link } from 'react-router-dom'
import { 
    Tooltip, 
    OverlayTrigger, 
    Button, 
    Card,
    Form,
    Modal 
    } from 'react-bootstrap'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'
import ToastMessage from '../Components/ToastMessage'

const MyAccount = () => {
    const {
        authState: {user},
        handleChangeUsername,
        handleChangePassword
    } = useContext(AuthContext)
    const {setShowToastMessage} = useContext(DataContext)

    const [ changeUsername, setChangeUsername ] = useState(false)
    const [ changePassword, setChangePassword ] = useState(false)

    // initial value
    const [ editUsername, setEditUsername ] = useState({
        password: '',
        newUsername: user.username
    })
    const [ editPassword, setEditPassword ] = useState({
        oldPassword: '', 
        newPassword: '',
        newPasswordConfirm: ''
    })
    const { password, newUsername } = editUsername  
    const { oldPassword, newPassword, newPasswordConfirm } = editPassword

    const onChangeUsername = event => {
        setEditUsername({...editUsername,[event.target.name] : event.target.value})
    }

    const onChangePassword = event => {
        setEditPassword({...editPassword,[event.target.name] : event.target.value})
    }

    const closeUsernameForm = () => {
        setChangeUsername(false)
        setEditUsername({password: '', newUsername: user.username})
    }

    const closePasswordForm = () => {
        setChangePassword(false)
        setEditPassword({oldPassword: '', newPassword: '', newPasswordConfirm: ''})
    }

    const showChangeUsername = () => {
        setChangeUsername(true)
        closePasswordForm()
    }

    const showChangePassword = () => {
        setChangePassword(true)
        closeUsernameForm()
    }

    const onSubmitUsername = async event => {
        event.preventDefault()
        const {success,message} = await handleChangeUsername(editUsername)
        setShowToastMessage({show:true,message,type: success?'success':'danger'})
        closeUsernameForm()
    }

    const onSubmitPassword = async event => {
        event.preventDefault()
        if(newPassword!==newPasswordConfirm) {
            setShowToastMessage({show:true,message: 'Confirm password incorrect',type:'danger'})
            return
        } else {
            const {success,message} = await handleChangePassword({oldPassword,newPassword})
            setShowToastMessage({show:true,message,type: success?'success':'danger'})
            closePasswordForm()
        }
    }

    const body = (
        <Card className="text-center mx-5 my-5">
            <Card.Header as='h1'>Hello! {user&&user.username}</Card.Header>
            <Card.Body>
                <Card.Title>Wellcome to MyFamily.</Card.Title>
                <Card.Text>I hope you enjoy with my app. Click the House icon below to visit Home page</Card.Text>
                <Button className='button mt-2' size='sm'
                    onClick={() => showChangeUsername()}
                >
                    Change Username
                </Button>
                {changeUsername && 
                    <Form onSubmit={onSubmitUsername}>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Control 
                                    type='text' 
                                    name='newUsername' 
                                    required 
                                    value={newUsername}
                                    onChange={onChangeUsername}
                                />
                                <Form.Text className='text-red'>Username is required</Form.Text>
                            </Form.Group>    

                            <Form.Group >
                                <Form.Control 
                                    type='password' 
                                    name='password' 
                                    required 
                                    placeholder = 'Enter password'
                                    value={password}
                                    onChange={onChangeUsername}
                                />
                                <Form.Text muted>Password is required</Form.Text>
                            </Form.Group>               
                        </Modal.Body>
                        <div className='mb-1'>
                            <Button variant='success' type='submit'>Update</Button>
                            <Button variant='secondary' className='ms-2'
                                onClick={() => closeUsernameForm()}
                            >
                                Cancel
                            </Button>
                        </div>
                        <Modal.Footer></Modal.Footer>
                    </Form>
                }
                <br/>
                <Button className='button mt-2' size='sm'
                    onClick={() => showChangePassword()}
                >
                    Change Password
                </Button>
                {changePassword && 
                    <Form onSubmit={onSubmitPassword}>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Control 
                                    type='password' 
                                    name='oldPassword' 
                                    required 
                                    placeholder = 'Enter old password'
                                    value={oldPassword}
                                    onChange={onChangePassword}
                                />
                                <Form.Text muted>Old password is required</Form.Text>
                            </Form.Group>   

                            <Form.Group className='mt-2'>
                                <Form.Control 
                                    type='password' 
                                    name='newPassword' 
                                    required 
                                    placeholder = 'Enter new password'
                                    value={newPassword}
                                    onChange={onChangePassword}
                                />
                                <Form.Text muted>New password is required</Form.Text>
                            </Form.Group>  

                            <Form.Group className='mt-2'>
                                <Form.Control 
                                    type='password' 
                                    name='newPasswordConfirm'
                                    placeholder = 'Confirm new password again'
                                    value={newPasswordConfirm}
                                    onChange={onChangePassword}
                                />
                            </Form.Group>              
                        </Modal.Body>
                        <div className='mb-5'>
                            <Button variant='success' type='submit'>Update</Button>
                            <Button variant='secondary' className='ms-2'
                                onClick={() => closePasswordForm()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                }
            </Card.Body>
        </Card>
    )

    return (
        <>
            {body}
            
            <Link to='/'>
                <OverlayTrigger
                    placement='left'
                    overlay={<Tooltip>Goback Home</Tooltip>}
                >
                        <Button className='btn-floating' size='sm'>
                            <img src={HomeIcon} alt='HomeIcon' width='36' heighr='36'/>
                        </Button>
                </OverlayTrigger>
            </Link>

            <ToastMessage />
        </>
    )
}

export default MyAccount