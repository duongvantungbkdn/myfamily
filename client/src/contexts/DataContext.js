import { createContext, useReducer, useState } from 'react'
import { dataReducer } from '../reducers/DataReducer'
import { 
    apiUrl,
    DATAS_LOADED_SUCCESS,
    DATAS_LOADED_FAIL,
    USERS_LOADED_SUCCESS,
    USERS_LOADED_FAIL,
    CREATE_NEW_DATA,
    DELETE_DATA,
    UPDATE_DATA,
    FIND_DATA,
    RESTORE_DATA,
    REMOVE_DATA,
    FIND_USER,
    LOCK_USER,
    ACTIVE_USER,
    REMOVE_USER,
    CHANGE_USER_ROLE
    } from './constants'
import axios from "axios";

export const DataContext = createContext()

const DataContextProvider = ({children}) => {

    // dataState
    const [dataState,dispatch] = useReducer(dataReducer,{
        datas: [],
        datasDeleted: [],
        datasAll: [],
        dataChosen: null,
        dataLoading: true,
        dataLoadSuccess: true,
        users: [],
        userChosen: null
    })

    // show or hide modal
    const [showCreateDataModal,setShowCreateDataModal] = useState(false)
    const [showConfirmDeleteModal,setShowConfirmDeleteModal] = useState(false)
    const [showRemoveUserModal,setShowRemoveUserModal] = useState(false)
    const [showConfirmRemoveModal,setShowConfirmRemoveModal] = useState(false)
    const [showEditDataModal,setShowEditDataModal] = useState(false)
    const [showToastMessage,setShowToastMessage] = useState({
        show: false,
        message: '',
        type: null
    })

    // get datas from server
    const getDatas = async() => {
        try {
            const response = await axios.get(`${apiUrl}`)
            if(response.data.success) {
                dispatch({
                    type: DATAS_LOADED_SUCCESS,
                    payload: response.data.datas
                })
            }
        } catch (error) {
            dispatch({type: DATAS_LOADED_FAIL})
        }
    }

    // create new Data
    const createNewData = async createDataForm => {
        try {
            const response = await axios.post(`${apiUrl}/data/create`,createDataForm)

            if(response.data.success) {
                dispatch({
                    type: CREATE_NEW_DATA,
                    payload: response.data.data
                })
                return response.data
            }
        } catch (error) {
            return(
                error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'}
            )
        }
    }

    // find data by dataId
    const findData = dataId => {
        const Data = dataState.datasAll.find(data => dataId === data._id)
        dispatch({
            type: FIND_DATA,
            payload: Data
        })
    }

    //soft delete data
    const deleteData = async dataId => {
        try {
            const response = await axios.delete(`${apiUrl}/data/${dataId}`)

            if(response.data.success) {
                dispatch({
                    type: DELETE_DATA,
                    payload: dataId
                })
            }
            return response.data
        } catch (error) {
            return (
                error.response.data
                ? error.response.data
                : {success: false, message: 'Server error'}
            )
        }
    }

    // edit one Data
    const editData = async dataUpdate => {
        try {
            const response = await axios.put(`${apiUrl}/data/${dataUpdate._id}`,dataUpdate)

            if(response.data.success) {
                dispatch({type: UPDATE_DATA,payload: response.data.data})
                return response.data
            } 
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    //restore data
    const restoreData = async dataId => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/data/${dataId}`)

            if(response.data.success) {
                dispatch({
                    type: RESTORE_DATA,
                    payload: dataId
                })
            }
            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    // remove data from trash
    const removeData = async dataId => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/data/${dataId}`)

            if(response.data.success) {
                dispatch({
                    type: REMOVE_DATA,
                    payload: dataId
                })
            }

            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }
    
    // get users list from server
    const getUsers = async() => {
        try {
            const response = await axios.get(`${apiUrl}/admin/usersList`)
            if(response.data.success) {
                dispatch({
                    type: USERS_LOADED_SUCCESS,
                    payload: response.data.users
                })
            }
        } catch (error) {
            dispatch({type: USERS_LOADED_FAIL})
        }
    }

    const findUser = userId => {
        const User = dataState.users.find(user => userId === user._id)
        dispatch({
            type: FIND_USER,
            payload: User
        })
    }

    const lockUser = async userId => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/user/${userId}`)

            if(response.data.success) {
                dispatch({
                    type: LOCK_USER,
                    payload: userId
                })
            }

            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    const activeUser = async userId => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/user/${userId}`)

            if(response.data.success) {
                dispatch({
                    type: ACTIVE_USER,
                    payload: userId
                })
            }

            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    const removeUser = async userId => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/user/remove/${userId}`)

            if(response.data.success) {
                dispatch({
                    type: REMOVE_USER,
                    payload: userId
                })
            }

            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    const changeUserRole = async (userId,role) => {
        try {
            const response = await axios.put(`${apiUrl}/admin/updateUserRole`,{_id:userId,role})

            if(response.data.success) {
                dispatch({
                    type: CHANGE_USER_ROLE,
                    payload: {userId,role}
                })
            }

            return response.data
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server error'}
            )
        }
    }

    // edit STT=index+1
    const getSTT = index => {
        return index + 1
    }

    const dataContextData = {
        dataState,
        getDatas,
        getUsers,
        createNewData,
        showCreateDataModal,
        setShowCreateDataModal,
        showToastMessage,
        setShowToastMessage,
        showConfirmDeleteModal,
        setShowConfirmDeleteModal,
        showEditDataModal,
        setShowEditDataModal,
        showConfirmRemoveModal,
        setShowConfirmRemoveModal,
        showRemoveUserModal,
        setShowRemoveUserModal,
        findData,
        deleteData,        
        editData,
        restoreData,
        removeData, 
        findUser,
        lockUser,
        activeUser,
        removeUser, 
        changeUserRole,  
        getSTT
    }

    return (
        <DataContext.Provider value={dataContextData}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
