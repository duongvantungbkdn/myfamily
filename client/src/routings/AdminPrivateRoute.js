import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { AuthContext } from '../contexts/AuthContext'

const AdminPrivateRoute = () => {
    const {authState : {authLoading, user}} = useContext(AuthContext)

    if(authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if (user) {
        return(
            (user.role === 'ADM' || user.role === 'ADM1')            
            ? <Outlet/>
            : <Navigate to='/' replace />
        )        
    } else {
        return(<Navigate to='/' replace />)
    }
}

export default AdminPrivateRoute
