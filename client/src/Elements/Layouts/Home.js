import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'
import { 
    Spinner, 
    Card, 
    Button, 
    Row, 
    Col,
    OverlayTrigger,
    Tooltip
    } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddIcon from '../../assets/icons/addIcon1.png'
import CreateDataModal from '../Components/CreateDataModal'
import ToastMessage from '../Components/ToastMessage'
import SingleData from '../Components/SingleData'
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal'
import EditDataModal from '../Components/EditDataModal'

const Home = () => {
    //take props from context
    const {
        dataState: {datas,dataChosen,dataLoading,dataLoadSuccess},
        getDatas,
        setShowCreateDataModal
    } = useContext(DataContext)
    const {authState: {user}} = useContext(AuthContext)

    // start: get all datas one time
    useEffect(() => getDatas(),[])

    let body = null

    if(dataLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if (datas.length === 0) {
        if(dataLoadSuccess) {
            body = (
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {user&&user.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Wellcome to MyFamily.</Card.Title>
                        <Card.Text>Click button below to add your first Video.</Card.Text>
                        <Button variant='primary' 
                           onClick={() => setShowCreateDataModal(true)}
                        >
                            Add Data
                        </Button>
                    </Card.Body>
                </Card>
            )
        } else {
            body = (
                <Card className="text-center mx-5 my-5">
                    <Card.Header as='h1'>Hi {user&&user.username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Sorry, datas can't load.</Card.Title>
                        <Card.Text>Click button below to reload my Home page.</Card.Text>
                        <Link to='/'>
                            <Button variant='primary'>Reload my Home page</Button>
                        </Link>
                    </Card.Body>
                </Card>
            )
        }
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {datas.map((data,index) => 
                        <Col key={index} className='my-2'>
                            <SingleData data={data}/>
                        </Col>
                    )}
                </Row>
                {user&&
                    <OverlayTrigger
                        placement='left'
                        overlay={<Tooltip>Add Data</Tooltip>}
                    >
                        <Button 
                            className='btn-floating' size='sm'
                            onClick={() => setShowCreateDataModal(true)}
                        >
                            <img src={AddIcon} alt='addData'/>
                        </Button>
                    </OverlayTrigger>                
                }
            </>
        )
    }

    return(
        <>
            {body}

            {/* show CreateDataModal when click add data */}
            <CreateDataModal/>
            
            {/* show ToastMessage */}
            <ToastMessage/>

            {/* show ConfirmDeleteModal */}
            {dataChosen && <ConfirmDeleteModal data={dataChosen}/>}

            {/* show EditDataModal */}
            {dataChosen && <EditDataModal data={dataChosen}/>}
        </>
    )
}

export default Home