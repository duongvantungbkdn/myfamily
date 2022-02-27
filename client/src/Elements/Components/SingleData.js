import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import ActionButton from './ActionButton'
import { Link } from 'react-router-dom'


const SingleData = ({data}) => {
    const {_id,title,description,url,thumnail,username, date, location} = data

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let body = null

    if(date&&location) {
        body = (
            <Card.Text>
                Video được quay vào thời gian {date} tại {location}.
                <p>{description}</p>               
            </Card.Text>
        )
    } else if(date&&!location) {
        body = (
            <Card.Text>
                Video được quay vào thời gian {date}.
                <p>{description}</p> 
            </Card.Text>
        )
    } else if(!date&&location) {
        body = (
            <Card.Text>
                Video được quay tại {location}.
                <p>{description}</p>
            </Card.Text>
        )
    } else if(description) {
        body = (
            <Card.Text>
                <p>{description}</p>
            </Card.Text>
        )
    }

    return (
        <Card 
            className='shadow' 
            border='success'
        >
            <Card.Header>
                <Row>                  

                    <Col className="d-flex justify-content-start align-items-center">
                        <ActionButton url={url} _id={_id} />
                    </Col>

                    <Col className="d-flex justify-content-end align-items-center">
                        <h5><Badge pill bg='info'>{username}</Badge></h5>
                    </Col>

                </Row>
            </Card.Header>   

            <Card.Link to={`/video/${_id}`} as={Link}>
                <div className='card-img-top course-img' style={{backgroundImage: `url(${thumnail})`}}></div>
            </Card.Link>
            
            <Card.Body>
                <Card.Link to={`/video/${_id}`} as={Link} className='text-decoration-none'>
                    <Card.Title >{title}</Card.Title>
                </Card.Link>

                {body}

            </Card.Body>
        </Card>
    )
}

export default SingleData

