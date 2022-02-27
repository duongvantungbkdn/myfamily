import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate, Outlet } from 'react-router-dom'

const AuthPreventRoute = () => {
    const {authState : {authLoading, user}} = useContext(AuthContext)

    if(authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else {
        return(
            user
            ? <Navigate to='/' replace />
            : <Outlet/>
        )        
    }
}

export default AuthPreventRoute
