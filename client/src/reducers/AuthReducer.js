import {
    CHANGE_USERNAME,
    CHANGE_PASSWORD
} from '../contexts/constants'
export const authReducer = (state,action) => {
    const {type,payload: {isAuthenticated,user}} = action
    switch(type) {
        case 'SET_AUTH':
            return {
                ...state,
                authLoading: false,
                isAuthenticated,
                user
            }
        case CHANGE_USERNAME:
            return {
                ...state,
                user
            }
        case CHANGE_PASSWORD:
            return {
                ...state,
                user
            }
        default: 
            return state
    }
}