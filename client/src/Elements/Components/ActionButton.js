import Button from 'react-bootstrap/Button'
import EditPencil from '../../assets/icons/EditPencil.svg'
import Trash from '../../assets/icons/Trash2.svg'
import Play from '../../assets/icons/PlayCircle2PNG.png'
import { DataContext } from '../../contexts/DataContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'



const ActionButton = ({url,_id}) => {
    // take props from useContext
    const {
        setShowConfirmDeleteModal,
        setShowEditDataModal,
        setShowToastMessage,
        findData,
        dataState: {datas}
    } = useContext(DataContext)

    const {authState:{user}} = useContext(AuthContext)

    // choose edit data
    const chooseEditData = dataId => {
        findData(dataId)

        //find data not through dispatch and reducer (because dispatch cause dataChosen slower one step)
        const data = datas.find(data => dataId === data._id)
        if(data) {
            if(user.role === 'ADM') {
                setShowEditDataModal(true)
            } else if(user._id.toString() === data.user.toString()) {
                setShowEditDataModal(true)
            } else {
                setShowToastMessage({
                    show:true,
                    message: 'Sorry! You can not edit video of other people.',
                    type: 'danger'
                }) 
            }           
        }         
    }

    // choose delete data
    const chooseDeleteData = dataId => {
        findData(dataId)

        //find data not through dispatch and reducer (because dispatch cause dataChosen slower one step)
        const data = datas.find(data => dataId === data._id)
        if(data) {
            if(user.role === 'ADM') {
                setShowConfirmDeleteModal(true)
            } else if(user._id.toString() === data.user.toString()) {
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

    return (
        <>
            <Link to={`/video/${_id}`}>
                <Button className='post-button' variant="success">
                    <img src={Play} alt='play' width='24' heighr='24'/>
                </Button>
            </Link>
            {user&&
                <>
                    <Button className='post-button' variant="secondary"
                        onClick={() => chooseEditData(_id)}
                    >
                        <img src={EditPencil} alt='edit' width='24' heighr='24'/>
                    </Button>
                    <Button className='post-button' variant="danger"
                        onClick={() => chooseDeleteData(_id)}
                    >
                        <img src={Trash} alt='trash' width='24' heighr='24'/>
                    </Button>
                </>
            }
            
        </>
    )
}

export default ActionButton
