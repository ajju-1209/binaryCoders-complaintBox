import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_SUCCESS,USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_RESET,UPDATE_USER_ROLE_FAIL,UPDATE_USER_ROLE_REQUEST,UPDATE_USER_ROLE_SUCCESS,GET_WORKERS_REQUEST,GET_WORKERS_FAIL,GET_WORKERS_SUCCESS} from '../constants/userConstants.js'

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_REGISTER_FAIL :
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return {laoding: true}
        case USER_LOGIN_SUCCESS: 
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL :
            return {loading: false, error: action.payload}
            case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const updateUserRoleReducer = (state = {},action) => {
    switch (action.type) {
        case UPDATE_USER_ROLE_REQUEST:
            return { loading: true }
        case UPDATE_USER_ROLE_SUCCESS:
            return { loading: false, success: true, userRole: action.payload }
        case UPDATE_USER_ROLE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getWorkersReducer = (state = {},action) => {
    switch (action.type) {
        case GET_WORKERS_REQUEST:
            return { loading: true }
        case GET_WORKERS_SUCCESS:
            return { loading: false, workers: action.payload }
        case GET_WORKERS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}