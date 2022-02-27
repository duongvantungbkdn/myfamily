export const apiUrl =
    process.env.NODE_ENV !== 'production'          
        ? 'http://localhost:5000'
        : ' https://myfamilytung2.herokuapp.com'

export const LOCAL_STORAGE_TOKEN_NAME = 'my_family'

export const DATAS_LOADED_SUCCESS ='DATAS_LOADED_SUCCESS'
export const DATAS_LOADED_FAIL = 'DATAS_LOADED_FAIL'
export const USERS_LOADED_SUCCESS ='USERS_LOADED_SUCCESS'
export const USERS_LOADED_FAIL = 'USERS_LOADED_FAIL'
export const CREATE_NEW_DATA = 'CREATE_NEW_DATA'
export const DELETE_DATA = 'DELETE_DATA'
export const UPDATE_DATA = 'UPDATE_DATA'
export const FIND_DATA = 'FIND_DATA'
export const RESTORE_DATA = 'RESTORE_DATA'
export const REMOVE_DATA = 'REMOVE_DATA'
export const FIND_USER = 'FIND_USER'
export const LOCK_USER = 'LOCK_USER'
export const ACTIVE_USER = 'ACTIVE_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const CONFIG_APP_LOAD_SUCCESS ='CONFIG_APP_LOAD_SUCCESS'
export const CONFIG_APP_LOAD_FAIL = 'CONFIG_APP_LOAD_FAIL'
export const CREATE_CONFIG = 'CREATE_CONFIG'
export const UPDATE_CONFIG = 'UPDATE_CONFIG'
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const CHANGE_USER_ROLE = 'CHANGE_USER_ROLE'
