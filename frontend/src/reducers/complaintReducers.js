import { CREATE_COMPLAINT_REQUEST, CREATE_COMPLAINT_SUCCESS, CREATE_COMPLAINT_FAIL, GET_COMPLAINTS_REQUEST, GET_COMPLAINTS_SUCCESS, GET_COMPLAINTS_FAIL, DELETE_COMPLAINT_REQUEST, DELETE_COMPLAINT_SUCCESS, DELETE_COMPLAINT_FAIL, GET_COMPLAINTS_WORKER_FAIL, GET_COMPLAINTS_WORKER_REQUEST, GET_COMPLAINTS_WORKER_SUCCESS, UPDATE_COMPLAINT_SOLVED_FAIL, UPDATE_COMPLAINT_SOLVED_REQUEST, UPDATE_COMPLAINT_SOLVED_SUCCESS, GET_COMPLAINTS_ADMIN_FAIL, GET_COMPLAINTS_ADMIN_REQUEST, GET_COMPLAINTS_ADMIN_SUCCESS,UPDATE_COMPLAINT_ASSIGNED_FAIL, UPDATE_COMPLAINT_ASSIGNED_REQUEST, UPDATE_COMPLAINT_ASSIGNED_SUCCESS } from '../constants/complaintConstants'

export const createComplaintReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COMPLAINT_REQUEST:
            return { loading: true }
        case CREATE_COMPLAINT_SUCCESS:
            return { loading: false, complaint: action.payload, success: true }
        case CREATE_COMPLAINT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getComplaintsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMPLAINTS_REQUEST:
            return { loading: true }
        case GET_COMPLAINTS_SUCCESS:
            return { loading: false, complaints: action.payload }
        case GET_COMPLAINTS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getComplaintsWorkerReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMPLAINTS_WORKER_REQUEST:
            return { loading: true }
        case GET_COMPLAINTS_WORKER_SUCCESS:
            return { loading: false, complaints: action.payload }
        case GET_COMPLAINTS_WORKER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteComplaintReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COMPLAINT_REQUEST:
            return { loading: true }
        case DELETE_COMPLAINT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_COMPLAINT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateComplaintSolvedReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_COMPLAINT_SOLVED_REQUEST:
            return { loading: true }
        case UPDATE_COMPLAINT_SOLVED_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_COMPLAINT_SOLVED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getComplaintsAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_COMPLAINTS_ADMIN_REQUEST:
            return { loading: true }
        case GET_COMPLAINTS_ADMIN_SUCCESS:
            return { loading: false, complaints: action.payload }
        case GET_COMPLAINTS_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateComplaintAssignedReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_COMPLAINT_ASSIGNED_REQUEST:
            return { loading: true }
        case UPDATE_COMPLAINT_ASSIGNED_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_COMPLAINT_ASSIGNED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}