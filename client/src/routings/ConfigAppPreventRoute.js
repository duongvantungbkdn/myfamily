import { useContext, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import { AuthContext } from '../contexts/AuthContext'
import { ConfigAppContext } from '../contexts/ConfigAppContext'

const ConfigAppPrivateRoute = () => {
    const {authState : {authLoading, user}} = useContext(AuthContext)
    const {
        configAppState: {lockRegister},
        getConfigApp
    } = useContext(ConfigAppContext)

    useEffect(() => getConfigApp(),[])

    if(authLoading) {
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else {
        if (lockRegister) {
            return(
                user
                ? <Navigate to='/' replace />
                : <Navigate to='/login' replace />
            )        
        } else {
            return (<Outlet/>)
        }
    }
    
}

export default ConfigAppPrivateRoute
