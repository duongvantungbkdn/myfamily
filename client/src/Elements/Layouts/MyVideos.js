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
import EditPencil from '../../assets/icons/EditPencil.svg'
import Trash from '../../assets/icons/Trash2.svg'
import Play from '../../assets/icons/PlayCircle2PNG.png'
import AddIcon from '../../assets/icons/addIcon1.png'
import { useContext, useEffect } from 'react'
import { DataContext } from '../../contexts/DataContext'
import { AuthContext } from '../../contexts/AuthContext'
import EditDataModal from '../Components/EditDataModal'
import ConfirmDeleteModal from '../Components/ConfirmDeleteModal'
import ToastMessage from '../Components/ToastMessage'
import CreateDataModal from '../Components/CreateDataModal'

const MyVideos = () => {
    // take props from useContext
    const {
        dataState: {datas, dataLoading, dataChosen, dataLoadSuccess},
        setShowEditDataModal,
        setShowConfirmDeleteModal,
        setShowToastMessage,
        setShowCreateDataModal,
        getDatas,
        findData,
        getSTT
    } = useContext(DataContext)

    const { authState: {user}} = useContext(AuthContext)

    useEffect(() => getDatas(),[])

    const yourDatas = datas.filter(data => 
        data.user.toString() === user._id.toString()
    )

    const chooseEditData = dataId => {
        findData(dataId)

        const Data = yourDatas.find( data => data._id === dataId )

        if(Data) {
            if(user) {
                setShowEditDataModal(true)
            }
            else {
                setShowToastMessage({
                    show: true,
                    type: 'danger',
                    message: 'You do not have permission to edit video of other people'
                })
            }
        }
    }

    const chooseDeleteData = dataId => {
        findData(dataId)

        const Data = yourDatas.find( data => data._id === dataId )

        if(Data) {
            if(user) {
                setShowConfirmDeleteModal(true)
            }
            else {
                setShowToastMessage({
                    show: true,
                    type: 'danger',
                    message: 'You do not have permission to delete video of other people'
                })
            }
        }
    }

    let body =null

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
                    <Card.Title>Sorry, your videos list can't load.</Card.Title>
                    <Card.Text>Click button below to reload.</Card.Text>
                    <Link to='/myVideos'>
                        <Button variant='primary'>Reload</Button>
                    </Link>
                </Card.Body>
            </Card>
        )
    } else {
        body = (
            <>
                <div className="d-flex align-items-center mt-2">
                    <h3>Manage your videos list.</h3> 

                    <Button type='post-button' className='text-white' variant='info'
                        onClick={() => setShowCreateDataModal(true)}
                    >
                        <img src={AddIcon} alt='addIcon' width='30' height='30' />
                    </Button>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Title</th>
                            <th>URL</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {yourDatas.map((data,index) => 
                        <tbody key={index}>
                            <tr>
                                <td>{getSTT(index)}</td>
                                <td>{data&&data.title}</td>
                                <td>{data&&data.url}</td>

                                <td>
                                    <Link to={`/video/${data._id}`}>
                                        <Button className='post-button' variant="outline-success" size='sm'>
                                            <img src={Play} alt='play' width='20' heighr='20'/>
                                        </Button>
                                    </Link>
                                </td>

                                <td>
                                    <Button className='post-button' variant="outline-info" size='sm'
                                        onClick={() => chooseEditData(data._id)}
                                    >
                                        <img src={EditPencil} alt='trash' width='20' heighr='20'/>
                                    </Button>
                                </td>

                                <td>
                                    <Button className='post-button' variant="outline-danger" size='sm'
                                       onClick={() => chooseDeleteData(data._id)}
                                    >
                                        <img src={Trash} alt='trash' width='20' heighr='20'/>
                                    </Button>
                                </td>
                            
                            </tr>
                        </tbody>
                        )
                    }
                    {yourDatas.length === 0 &&
                        <tr>
                            <td colSpan="5" >
                                <div className='d-flex align-item-center justify-content-center'>
                                    <div>
                                        <b>You haven't posted any video yet. Click Plus icon above to post your video</b>
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

            <ToastMessage/>
            <CreateDataModal/>

            {/* edit data modal */}
            {dataChosen && <EditDataModal data={dataChosen}/>}

            {/* delete data modal */}
            {dataChosen && <ConfirmDeleteModal data={dataChosen}/>}
        </>
    )
}

export default MyVideos