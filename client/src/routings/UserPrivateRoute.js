import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { AuthContext } from '../contexts/AuthContext'

const UserPrivateRoute = () => {
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
            ? <Outlet/>
            : <Navigate to='/' replace />
        )        
    }
}

export default UserPrivateRoute
