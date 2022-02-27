import { useContext, useEffect } from "react"
import { ConfigAppContext } from "../../contexts/ConfigAppContext"
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
import ToastMessage from '../Components/ToastMessage'
import CreateConfigModal from "../Components/CreateConfigModal"
import EditConfigModal from "../Components/EditConfigModal"
import { AuthContext } from "../../contexts/AuthContext"
import { DataContext } from "../../contexts/DataContext"

const ConfigApp = () => {

    const {
        configAppState,
        getConfigApp,
        editConfig,
        setShowCreateConfigModal,
        setShowEditConfigModal,
    } = useContext(ConfigAppContext)

    const {setShowToastMessage} = useContext(DataContext)

    const {authState: {user}} = useContext(AuthContext)

    useEffect(() => getConfigApp(),[])

    const {
        MemFamilyName,
        PhoneNumber,
        configAppLoadSuccess,
        configAppLoading,
        EmailAddress,
        lockRegister,
        showMemFamilyName,
        showPhoneNumber,
        showEmailAddress
    } = configAppState

    const handleChangeStatus = async (name,value) => {
        const {success, message} = await editConfig({...configAppState, [name]: !value})
        getConfigApp()
    }

    const createConfigValue = () => {
        if(user.role === 'ADM') {
            setShowCreateConfigModal(true)
        } else {
            setShowToastMessage({
                show: true,
                type: 'danger',
                message: 'You don not have permission'
            })
        }
    }

    const editConfigValue = () => {
        if(user.role === 'ADM') {
            setShowEditConfigModal(true)
        } else {
            setShowToastMessage({
                show: true,
                type: 'danger',
                message: 'You don not have permission'
            })
        }
    }

    const lockOrActiveRegister = (name,value) => {
        if(user.role === 'ADM') {
            handleChangeStatus(name,value)
        } else {
            setShowToastMessage({
                show: true,
                type: 'danger',
                message: 'You don not have permission'
            })
        }
    }

    let body = null

    if(configAppLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if(!configAppLoadSuccess) {
        body = (
            <Card className="text-center mx-5 my-5">
                <Card.Header as='h1'>Hi admin!</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Sorry, configApps list can't load.
                        Click button below to reload configApp list.
                    </Card.Title>
                    <Link to='/configApp'>
                        <Button variant='primary'>Reload configApp list</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    } else {
        if(Object.keys(configAppState).length <= 3) {
            body = (
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi admin!</Card.Header>
                    <Card.Body>
                        <Card.Title>You have not create config app yet.</Card.Title>
                        <Card.Text>Click button below to create config app.</Card.Text>
                        <Button className='button' variant="outline-success" size='sm'
                            onClick={() => createConfigValue()}
                        >
                            Create ConfigApp
                        </Button>
                    </Card.Body>
                </Card>
            )
        } else {
            const members = MemFamilyName.split(':')
            body = (
                <>
                    <div className="d-flex align-items-center mt-2">
                        <h3>Config Application parameters.</h3>
                        <Button className='button' variant="outline-success" size='sm'
                            onClick={() => editConfigValue()}
                        >
                            Edit Value
                        </Button>
                    </div>
    
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Parameters</th>
                                <th>Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>lockRegister</b></td>
                                <td></td>
                                <td>{
                                    <Button className='post-button' 
                                        variant={`outline-${lockRegister?'danger':'success'}`} size='sm'
                                        onClick={() => lockOrActiveRegister('lockRegister',lockRegister)}
                                    >
                                        {lockRegister?'LOCK':'ACTIVE'}
                                    </Button>
                                }</td>
                            </tr>

                            <tr>
                                <td><b>PhoneNumber</b></td>
                                <td>{PhoneNumber}</td>
                                <td>{
                                    <Button className='post-button' 
                                        variant={`outline-${!showPhoneNumber?'danger':'success'}`} size='sm'
                                        onClick={() => handleChangeStatus('showPhoneNumber',showPhoneNumber)}
                                    >
                                        {!showPhoneNumber?'HIDE':'SHOW'}
                                    </Button>
                                }</td>
                            </tr>

                            <tr>
                                <td><b>EmailAddress</b></td>
                                <td>{EmailAddress}</td>
                                <td>{
                                    <Button className='post-button' 
                                        variant={`outline-${!showEmailAddress?'danger':'success'}`} size='sm'
                                        onClick={() => handleChangeStatus('showEmailAddress',showEmailAddress)}
                                    >
                                        {!showEmailAddress?'HIDE':'SHOW'}
                                    </Button>
                                }</td>
                            </tr>

                            <tr>
                                <td><b>Family's Members</b></td>
                                <td>{members[0]}: {members[1]}</td>
                                <td>
                                    <Button className='post-button' 
                                        variant={`outline-${!showMemFamilyName?'danger':'success'}`} size='sm'
                                        onClick={() => handleChangeStatus('showMemFamilyName',showMemFamilyName)}
                                    >
                                        {!showMemFamilyName?'HIDE':'SHOW'}
                                    </Button>
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td>{members[2]}: {members[3]}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{members[4]}: {members[5]}</td>
                                <td></td>
                            </tr>
                            { members.length > 6 &&
                                <tr>
                                    <td></td>
                                    <td>{members[6]}: {members[7]}</td>
                                    <td></td>
                                </tr>
                            }

                            { members.length > 8 &&
                                <tr>
                                    <td></td>
                                    <td>{members[8]}: {members[9]}</td>
                                    <td></td>
                                </tr>
                            }

                            { members.length > 10 &&
                                <tr>
                                    <td></td>
                                    <td>{members[10]}: {members[11]}</td>
                                    <td></td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    
                </>            
            )
        }
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

            <CreateConfigModal/>
            <EditConfigModal/>
            <ToastMessage/>
        </>
    )
}

export default ConfigApp