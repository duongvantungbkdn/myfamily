import { Link } from 'react-router-dom'
import { 
    Tooltip, 
    OverlayTrigger, 
    Button, 
    Table, 
    Card, 
    Spinner 
    } from 'react-bootstrap'
import Trash from '../../assets/icons/Trash2.svg'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { AuthContext } from '../../contexts/AuthContext'
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal'
import ToastMessage from '../Components/ToastMessage'

const VideosList = () => {
    // take props from useContext
    const {
        dataState: { datas, datasDeleted, dataLoading, dataChosen, dataLoadSuccess},
        getSTT,
        setShowConfirmDeleteModal,
        setShowToastMessage,
        getDatas,
        findData
    } = useContext(DataContext)
    const {authState: {user}} = useContext(AuthContext)

    let body = null

    useEffect(() => getDatas(),[])

    // choose delete data
    const chooseDeleteData = dataId => {
        findData(dataId)

        // //find data not through dispatch and reducer (because dispatch cause dataChosen slower one step)
        const Data = datas.find(data => dataId === data._id)

        if(Data) {
            if(user.role === 'ADM') {
                setShowConfirmDeleteModal(true)
            } else if(user._id.toString() === Data.user.toString()) {
                setShowConfirmDeleteModal(true)
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You can not delete video of other people.',
                    type: 'danger'
                }) 
            }           
        }        
    }

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
                    <Card.Title>Sorry, datas can't load.</Card.Title>
                    <Card.Text>Click button below to reload datas.</Card.Text>
                    <Link to='/videosList'>
                        <Button variant='primary'>Reload datas</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <div className="d-flex align-items-center mt-2">
                    <h3>Manage Videos list.</h3> 

                    {(datasDeleted.length !== 0) &&
                        <Link to='/trash/data'>
                            <Button className='post-button' variant="info">
                                <img src={Trash} alt='trash' width='24' heighr='24'/>
                                {datasDeleted.length}
                            </Button>
                        </Link>                    
                    }
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>URL</th>
                        <th>User</th>
                        <th></th>
                        </tr>
                    </thead>
                    {datas.map((data,index) => 
                        <tbody key={index}>
                            <tr>
                            <td>{getSTT(index)}</td>
                            <td>{data&&data.title}</td>
                            <td>{data&&data.url}</td>
                            <td>{data&&data.username}</td>
                            <td>
                                <Button className='post-button' variant="outline-danger" size='sm'
                                    onClick={() => chooseDeleteData(data._id)}
                                >
                                    <img src={Trash} alt='trash' width='20' height='20'/>
                                </Button>
                            </td>
                            </tr>
                        </tbody>
                        )
                    }
                </Table>

                {datas.length === 0 &&
                    <tr>
                        <td colSpan="5" >
                            <div className="d-flex justify-content-center align-items-center">
                                <div>
                                    <b>Videos list is empty.</b>
                                </div> 
                                <br/>
                                <Button className='post-button' variant="info" className="text-white"
                                    //  onClick={() => chooseDeleteData(data._id)}
                                >
                                        <b>Click here to post Your video!</b>
                                </Button>
                            </div>
                        </td>
                    </tr>
                }
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

            <ToastMessage/>

            {/* show ConfirmDeleteModal */}
            {dataChosen && <ConfirmDeleteModal data={dataChosen}/>}
        </>
    )
}

export default VideosList