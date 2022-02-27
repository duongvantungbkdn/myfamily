import { Link } from 'react-router-dom'
import { 
    Tooltip, 
    OverlayTrigger, 
    Button, 
    Table, 
    Card, 
    Spinner 
    } from 'react-bootstrap'
import HomeIcon from '../../assets/icons/HomeIcon.png'
import List2 from '../../assets/icons/List2.png'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { AuthContext } from '../../contexts/AuthContext'
import ConfirmRemoveModal from '../Components/ConfirmRemoveModal'
import ToastMessage from '../Components/ToastMessage'

const VideosTrash = () => {
    // take props from useContext
    const {
        dataState: { datas, datasDeleted, dataLoading, dataChosen, dataLoadSuccess},
        getSTT,
        setShowConfirmRemoveModal,
        setShowToastMessage,
        getDatas,
        findData,
        restoreData,
    } = useContext(DataContext)
    const {authState: {user}} = useContext(AuthContext)

    let body = null

    useEffect(() => getDatas(),[])

    // choose delete data
    const chooseRestoreData = async dataId => {
        const Data = datasDeleted.find(data => dataId === data._id)

        if(Data) {
            if(user.role === 'ADM') {
                const {success,message} = await restoreData(dataId) 
                setShowToastMessage({show:true,message,type: success?'success':'danger'})
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You do not have permission.',
                    type: 'danger'
                }) 
            }        
        }        
    }

    // choose remove data
    const chooseRemoveData = dataId => {
        findData(dataId)

        //find data not through dispatch and reducer (because dispatch cause dataChosen slower one step)
        const Data = datasDeleted.find(data => dataId === data._id)
        if(Data) {
            if(user.role === 'ADM') {
                setShowConfirmRemoveModal(true)
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You do not have permission.',
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
                    <Card.Title>Sorry, Videos Trash can't load.</Card.Title>
                    <Card.Text>Click button below to reload Trash.</Card.Text>
                    <Link to='/trash/data'>
                        <Button variant='primary'>Reload</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <div className="d-flex align-items-center mt-2">
                    <h3>Manage deleted Videos list.</h3> 

                    {(datas.length !== 0) &&
                        <Link to='/videosList'>
                            <Button className='post-button' variant="info">
                                <img src={List2} alt='trash' width='24' heighr='24'/>
                                {datas.length}
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
                        <th></th>
                        </tr>
                    </thead>
                    {datasDeleted.map((data,index) => 
                        <tbody key={index}>
                            <tr>
                            <td>{getSTT(index)}</td>
                            <td>{data&&data.title}</td>
                            <td>{data&&data.url}</td>
                            <td>{data&&data.username}</td>

                            <td>
                                <Button className='post-button' variant="outline-success" size='sm'
                                   onClick={() => chooseRestoreData(data._id)}
                                >
                                    Restore
                                    {/* <img src={Trash} alt='trash' width='20' heighr='20'/> */}
                                </Button>
                            </td>

                            <td>
                                <Button className='post-button' variant="outline-danger" size='sm'
                                   onClick={() => chooseRemoveData(data._id)}
                                >
                                    Remove
                                    {/* <img src={Trash} alt='trash' width='20' heighr='20'/> */}
                                </Button>
                            </td>
                            
                            </tr>
                        </tbody>
                        )
                    }

                    {datasDeleted.length === 0 &&
                        <tr>
                            <td colSpan="5" >
                                <div>
                                    <b>Trash is empty.</b>
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

            <ToastMessage/>

            {/* show ConfirmRemoveModal */}
            {dataChosen && <ConfirmRemoveModal data={dataChosen}/>}
        </>
    )
}

export default VideosTrash