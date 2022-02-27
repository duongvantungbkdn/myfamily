import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DataContext } from '../../contexts/DataContext'
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap'
import HomeIcon from '../../assets/icons/HomeIcon.png'

const ShowData = () => {

    const { id } = useParams()
    const { dataState: {datas}} = useContext(DataContext)

    let body = <h1>DATA NOT FOUND</h1>

    // take data chosen and take videoID
    let videoId = null
    let data
    if(id) {
        data = datas.find(data => data._id === id) 
        if(data){
            videoId = data.url.split('/watch?v=')[1]
            body = (
                <div className="col-lg-9 col-md-12">
                    <h2 >{data.title}</h2>
                    <iframe className='d-flex justify-content-center' width="727" height="409" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <p>{data.description}</p>
                </div>
            )
        } 
    } 

    return (
        <div className='d-flex justify-content-center'>
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
            
        </div>        
    )
}

export default ShowData