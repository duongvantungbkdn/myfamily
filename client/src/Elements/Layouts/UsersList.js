import { Link } from 'react-router-dom'
import { 
    Tooltip, 
    OverlayTrigger, 
    Button,
    Spinner,
    Card,
    Table
    } from 'react-bootstrap'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import Trash from '../../assets/icons/Trash2.svg'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { AuthContext } from '../../contexts/AuthContext'
import RemoveUserModal from '../Components/RemoveUserModal'
import ToastMessage from '../Components/ToastMessage'

const UsersList = () => {
    const {
        dataState: {users, userChosen, dataLoading, dataLoadSuccess},
        setShowRemoveUserModal,
        setShowToastMessage,
        getUsers,
        findUser,
        lockUser,
        activeUser,
        changeUserRole,
        getSTT
    } = useContext(DataContext)
    const {authState: {user}} = useContext(AuthContext)

    useEffect(() => getUsers(),[])

    const chooseRemoveUser = userId => {
        findUser(userId)

        const User = users.find(user => user._id === userId)
        if(User) {
            if(user.role === 'ADM') {
                setShowRemoveUserModal(true)
            } else {
                setShowToastMessage({
                    show: true,
                    type: 'danger',
                    message: 'You are not Admin, you do not have permission'
                })
            }
            
        }
    }

    const handleLockOrActiveUser = async userId => {
        const User = users.find(user => userId === user._id)

        console.log(user._id.toString(),userId.toString())
        if(User) {
            if(user._id.toString()!==userId.toString()) {
                if(User.deleted) {
                    try {
                        const {success, message} = await activeUser(userId)
                        setShowToastMessage({show: true, message, type: success?'success':'danger'})
                    } catch (error) {
                        setShowToastMessage({
                            show:true,
                            message: 'Sorry! Server error.',
                            type: 'danger'
                        })
                    }
                } else {
                    try {
                        const {success, message} = await lockUser(userId)
                        setShowToastMessage({show: true, message, type: success?'success':'danger'})
                    } catch (error) {
                        setShowToastMessage({
                            show:true,
                            message: 'Sorry! Server error.',
                            type: 'danger'
                        })
                    }
                }
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You can not lock/active yourseft.',
                    type: 'danger'
                })
            }
        } else {
            setShowToastMessage({
                show:true,
                message: 'Sorry! User does not exist.',
                type: 'danger'
            })
        }       
    }

    const handleChangeUserRole = async userId => {
        const User = users.find(user => userId === user._id)

        if(User) {
            if(user.role==='ADM') {
                if(User.role!=='ADM1') {
                    try {
                        const {success, message} = await changeUserRole(userId,'ADM1')
                        setShowToastMessage({show: true, message, type: success?'success':'danger'})
                    } catch (error) {
                        setShowToastMessage({
                            show:true,
                            message: 'Sorry! Server error.',
                            type: 'danger'
                        })
                    }
                } else {
                    try {
                        const {success, message} = await changeUserRole(userId,'MEM')
                        setShowToastMessage({show: true, message, type: success?'success':'danger'})
                    } catch (error) {
                        setShowToastMessage({
                            show:true,
                            message: 'Sorry! Server error.',
                            type: 'danger'
                        })
                    }
                }
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You do not have permission.',
                    type: 'danger'
                })
            }
        } else {
            setShowToastMessage({
                show:true,
                message: 'Sorry! User does not exist.',
                type: 'danger'
            })
        }       
    }

    let body = null

    if(dataLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if(!dataLoadSuccess) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as='h1'>Hi {user&&user.username}</Card.Header>
                <Card.Body>
                    <Card.Title>Sorry, users list can't load.</Card.Title>
                    <Card.Text>Click button below to reload users list.</Card.Text>
                    <Link to='/usersList'>
                        <Button variant='primary'>Reload users list</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <div className="d-flex align-items-center mt-2">
                    <h3>Manage Users list.</h3> 
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th></th>
                        </tr>
                    </thead>
                    {users.map((user,index) => 
                        <tbody key={index}>
                            <tr>
                            <td>{getSTT(index)}</td>
                            <td>{user&&user.username}</td>
                            <td>{
                                user&&
                                    <Button className='post-button' 
                                    variant={`outline-${user.role==='ADM1'?'success':'warning'}`} size='sm'
                                    onClick={() => handleChangeUserRole(user._id)}
                                >
                                    {user.role}
                                </Button>                                    
                            }</td>

                            <td>{
                                user&&
                                    <Button className='post-button' 
                                        variant={`outline-${user.deleted?'danger':'success'}`} size='sm'
                                        onClick={() => handleLockOrActiveUser(user._id)}
                                    >
                                        {user.deleted?'LOCK':'ACTIVE'}
                                    </Button>
                            }</td>

                            <td>
                                <Button className='post-button' variant="outline-danger" size='sm'
                                    onClick={() => chooseRemoveUser(user._id)}
                                >
                                    <img src={Trash} alt='trash' width='20' height='20'/>
                                </Button>
                            </td>
                            </tr>
                        </tbody>
                        )
                    }
                    {users.length === 0 &&
                        <tr>
                            <td colSpan="5" >
                                <div className="d-flex justify-content-center align-items-center">
                                    <div>
                                        <b>Users list is empty.</b>
                                    </div> 
                                </div>
                            </td>
                        </tr>
                    }
                </Table>
                
            </>            
        )
    }

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

            {userChosen && <RemoveUserModal user={userChosen}/>}

            <ToastMessage/>
        </>
    )
}

export default UsersList