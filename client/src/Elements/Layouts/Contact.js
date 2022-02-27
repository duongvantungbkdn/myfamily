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
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ConfigAppContext } from '../../contexts/ConfigAppContext'
import CreateConfigModal from '../Components/CreateConfigModal'

const Contact = () => {

    const {
        configAppState,
        getConfigApp,
        setShowCreateConfigModal
    } = useContext(ConfigAppContext)

    const {authState: {user}} = useContext(AuthContext)

    useEffect(() => getConfigApp(),[])

    const {
        PhoneNumber,
        configAppLoadSuccess,
        configAppLoading,
        EmailAddress,
        showPhoneNumber,
        showEmailAddress
    } = configAppState

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
                <Card.Header as='h1'>Hi {user&&user.username}!</Card.Header>
                <Card.Body>
                    <Card.Title>
                        Sorry, configApps list can't load.
                    </Card.Title>
                </Card.Body>
            </Card>
        )
    } else {
        if(Object.keys(configAppState).length <= 3) {
            body = (
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {user&&user.username}!</Card.Header>
                    <Card.Body>
                        <Card.Title>You have not create config app yet.</Card.Title>
                        <Card.Text>Click button below to create config app.</Card.Text>
                        <Button className='button' variant="outline-success" size='sm'
                            onClick={() => setShowCreateConfigModal(true)}
                        >
                            Create ConfigApp
                        </Button>
                    </Card.Body>
                </Card>
            )
        } else {
            body = (
                <>
                    <div className="d-flex align-items-center mt-2">
                        <h3>Contact me.</h3>
                    </div>
    
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td><b>Phone Number</b></td>
                                <td>{showPhoneNumber?PhoneNumber:'Sorry, private infomation'}</td>
                            </tr>

                            <tr>
                                <td><b>Email Address</b></td>
                                <td>{showEmailAddress?EmailAddress:'Sorry, private infomation'}</td>
                            </tr>
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
        </>
    )
}

export default Contact