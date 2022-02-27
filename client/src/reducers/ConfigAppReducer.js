import {
    CONFIG_APP_LOAD_SUCCESS,
    CONFIG_APP_LOAD_FAIL,
    CREATE_CONFIG,
    UPDATE_CONFIG
    } from '../contexts/constants'

export const configAppReducer = (state, action) => {
    const {type,payload} = action
    switch (type) {
        case CONFIG_APP_LOAD_SUCCESS:
            return {
                ...payload[0],
                configAppLoading: false,
                configAppLoadSuccess: true,
            }
        case CONFIG_APP_LOAD_FAIL:
            return {
                ...state[0],
                configAppLoading: false,
                configAppLoadSuccess: false,
            }
        case CREATE_CONFIG:
            return payload
        case UPDATE_CONFIG:
            return payload
        
        default:
            return state[0]
    }
}
