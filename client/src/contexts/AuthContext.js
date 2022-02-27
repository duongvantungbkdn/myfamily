import axios from 'axios'
import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/AuthReducer'
import setAuthToken from '../utils/setAuthToken'
import { 
    apiUrl,
    LOCAL_STORAGE_TOKEN_NAME,
    CHANGE_USERNAME,
    CHANGE_PASSWORD
 } from './constants'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{

    const [authState, dispatch] = useReducer(authReducer,{
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //authenticate user
    const loadUser = async() => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${apiUrl}`)
            if(response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch(error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(),[])

    // user logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
    }

    // user login
    const loginUser = async loginForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/auth/login`,loginForm)
            
            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // user register
    const registerUser = async registerForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/auth/register`,registerForm)

            if(response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME,response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    } 
    
    const handleChangeUsername = async usernameForm => {
        try {
            const response = await axios.put(`${apiUrl}/user/changeUsername`,usernameForm)

            if(response.data.success) {
                dispatch({
                    type: CHANGE_USERNAME,
                    payload: response.data.user
                })
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const handleChangePassword = async passwordForm => {
        try {
            const response = await axios.put(`${apiUrl}/user/changePassword`,passwordForm)

            if(response.data.success) {
                dispatch({
                    type: CHANGE_PASSWORD,
                    payload: response.data.user
                })
            }

            await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const authContextData = {
        authState,
        loginUser,
        logoutUser,
        registerUser,
        loadUser,
        handleChangeUsername,
        handleChangePassword
    }

    return(
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
