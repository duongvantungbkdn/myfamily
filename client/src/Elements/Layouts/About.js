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

const About = () => {

    const {
        configAppState,
        getConfigApp,
        setShowCreateConfigModal
    } = useContext(ConfigAppContext)

    const {authState: {user}} = useContext(AuthContext)

    useEffect(() => getConfigApp(),[])

    const {
        MemFamilyName,
        showMemFamilyName,
        configAppLoadSuccess,
        configAppLoading,
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
            const members = MemFamilyName.split(':')

            body = (
                <>
                    <div className="d-flex align-items-center mt-2">
                        <h3>About my family.</h3>
                    </div>
                    {user ?
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td><b>{members[0]}</b></td>
                                    <td>{showMemFamilyName?members[1]:'Sorry, private infomation'}</td>
                                </tr>

                                <tr>
                                    <td><b>{members[2]}</b></td>
                                    <td>{showMemFamilyName?members[3]:'Sorry, private infomation'}</td>
                                </tr>
                                <tr>
                                    <td><b>{members[4]}</b></td>
                                    <td>{showMemFamilyName?members[5]:'Sorry, private infomation'}</td>
                                </tr>
                                { members.length > 6 &&
                                    <tr>
                                        <td><b>{members[6]}</b></td>
                                        <td>{showMemFamilyName?members[7]:'Sorry, private infomation'}</td>
                                    </tr>
                                }

                                { members.length > 8 &&
                                    <tr>
                                        <td><b>{members[8]}</b></td>
                                        <td>{showMemFamilyName?members[9]:'Sorry, private infomation'}</td>
                                    </tr>
                                }

                                { members.length > 10 &&
                                    <tr>
                                        <td><b>{members[10]}</b></td>
                                        <td>{showMemFamilyName?members[10]:'Sorry, private infomation'}</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                        : 
                        <div className="d-flex align-items-center mt-2">
                            <h4>You need login.</h4>
                        </div>
                    }                    
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

export default About