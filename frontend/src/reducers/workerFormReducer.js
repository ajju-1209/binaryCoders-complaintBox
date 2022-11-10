import {CREATE_RECORD_REQUEST,CREATE_RECORD_SUCCESS,CREATE_RECORD_FAIL,GET_RECORDS_REQUEST,GET_RECORDS_FAIL,GET_RECORDS_SUCCESS,UPDATE_WORKER_STATUS_FAIL,UPDATE_WORKER_STATUS_REQUEST,UPDATE_WORKER_STATUS_SUCCESS} from '../constants/workerFormConstants'

export const createRecordReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_RECORD_REQUEST:
            return {loading: true}
        case CREATE_RECORD_SUCCESS:
            return {loading: false, success: true}
        case CREATE_RECORD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const getRecordsReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_RECORDS_REQUEST:
            return {loading: true}
        case GET_RECORDS_SUCCESS:
            return {loading: false, records: action.payload}
        case GET_RECORDS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const updateWorkerStatusReducer = (state = {}, action) => {
    switch(action.type) {
        case UPDATE_WORKER_STATUS_REQUEST:
            return {loading: true}
        case UPDATE_WORKER_STATUS_SUCCESS:
            return {loading: false, success: true, data: action.payload}
        case UPDATE_WORKER_STATUS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}