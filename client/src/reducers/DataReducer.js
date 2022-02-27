import { 
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
    } from '../contexts/constants'

export const dataReducer = (state,action) => {
    const {type,payload} = action
    switch(type) {
        case DATAS_LOADED_SUCCESS:
            return {
                ...state,
                datasAll: payload,
                datas: payload.filter( data => data.deleted === false),
                datasDeleted: payload.filter( data => data.deleted === true),
                dataLoading: false,
                dataLoadSuccess: true
            }

        case DATAS_LOADED_FAIL:
            return {
                ...state,
                datas: [],
                datasAll: [],
                datasDeleted: [],
                dataLoading: false,
                dataLoadSuccess: false
            }
        case USERS_LOADED_SUCCESS:
            return {
                ...state,
                users: payload,
                dataLoading: false,
                dataLoadSuccess: true
            }

        case USERS_LOADED_FAIL:
            return {
                ...state,
                users: [],
                dataLoading: false,
                dataLoadSuccess: false
            }

        case CREATE_NEW_DATA:
            return {
                ...state,
                datas: [...state.datas,payload]
            }
        case DELETE_DATA:
            const data_delete = state.datas.find(data => data._id === payload)
            return {
                ...state,
                datas: state.datas.filter(data => data._id !== payload),
                datasDeleted: state.datasDeleted.concat(data_delete)
            }
        case UPDATE_DATA:
            return {
                ...state,
                datas: state.datas.map(data => 
                    data._id === payload._id
                    ? payload
                    : data
                    )
            }
        case FIND_DATA:
            return {
                ...state,
                dataChosen: payload
            }
        case RESTORE_DATA:
            const data_restore = state.datasDeleted.find(data => data._id === payload)
            return {
                ...state,
                datas: state.datas.concat(data_restore),
                datasDeleted: state.datasDeleted.filter(data => data._id !== payload)
            }
        case REMOVE_DATA:
            return {
                ...state,
                datasDeleted: state.datasDeleted.filter(data => data._id !== payload)
            }

        case FIND_USER:
            return {
                ...state,
                userChosen: payload
            }
        case LOCK_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user._id === payload) {user.deleted = true}
                    return user
                })
            }
        case ACTIVE_USER:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user._id === payload) {user.deleted = false}
                    return user
                })
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== payload)
            }
        case CHANGE_USER_ROLE:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user._id === payload.userId) {user.role = payload.role}
                    return user
                })
            }

        default:
            return state
    }
}
