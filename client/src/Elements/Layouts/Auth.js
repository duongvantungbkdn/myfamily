import LoginForm from "../Components/LoginForm"
import RegisterForm from "../Components/RegisterForm"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext } from "react"
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({auth}) => {
    const {authState: {authLoading}} = useContext(AuthContext)

    let body

    if(authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else {
        body = (
            <>
                {auth==='login' && <LoginForm/>}
                {auth==='register' && <RegisterForm/>}
            </>
        )
    }
    

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>Login to visit my family.</h1>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth
