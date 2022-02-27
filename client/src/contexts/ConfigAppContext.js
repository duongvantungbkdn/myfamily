import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { configAppReducer } from "../reducers/ConfigAppReducer";
import { 
    apiUrl,
    CONFIG_APP_LOAD_SUCCESS,
    CONFIG_APP_LOAD_FAIL,
    CREATE_CONFIG,
    UPDATE_CONFIG
    } from "./constants";


export const ConfigAppContext = createContext()

const ConfigAppContextProvider = ({children}) => {

    const [configAppState,dispatch] = useReducer(configAppReducer, {
        configAppLoading: true,
        configAppLoadSuccess: true,
        lockRegister: false,
        showMemFamilyName: true,
        showPhoneNumber: true,
        showEmailAddress: true,
        PhoneNumber: '',
        EmailAddress: '',
        MemFamilyName: ''
    })

    const [showCreateConfigModal,setShowCreateConfigModal] = useState(false)
    const [showEditConfigModal,setShowEditConfigModal] = useState(false)

    const getConfigApp = async ()=> {
        try {
            const response = await axios.get(`${apiUrl}/configApp`)

            if(response.data.success) {
                dispatch({
                    type: CONFIG_APP_LOAD_SUCCESS,
                    payload: response.data.configs
                })
            }

            return response.data
        } catch (error) {
            dispatch({
                type: CONFIG_APP_LOAD_FAIL
            })
        }
    }

    // create Config
    const createConfig = async createCongigForm => {
        try {
            const response = await axios.post(`${apiUrl}/admin/setConfigApp`, createCongigForm)

            if(response.data.success) {
                dispatch({
                    type: CREATE_CONFIG,
                    payload: response.data.config
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

    // edit ConfigApp
    const editConfig = async updatedConfig => {
        try {
            const response = await axios.put(`${apiUrl}/admin/updateConfigApp`,updatedConfig)

            if(response.data.success) {
                dispatch({
                    type: UPDATE_CONFIG,
                    payload: response.data.config
                })
                return response.data
            } 
        } catch (error) {
            return (
                error.response.data 
                ? error.response.data 
                : {success: false, message: 'Server update config app error'}
            )
        }
    }

    const configAppData = {
        configAppState,
        getConfigApp,
        showCreateConfigModal,
        setShowCreateConfigModal,
        showEditConfigModal,
        setShowEditConfigModal,
        createConfig,
        editConfig
    }

    return (
        <ConfigAppContext.Provider value={configAppData}>
            {children}
        </ConfigAppContext.Provider>
    )

}

export default ConfigAppContextProvider
