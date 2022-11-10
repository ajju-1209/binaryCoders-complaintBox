import { GET_SERVICES_SUCCESS, GET_SERVICES_FAIL, GET_SERVICES_REQUEST, CREATE_SERVICES_SUCCESS, CREATE_SERVICES_FAIL, CREATE_SERVICES_REQUEST, DELETE_SERVICES_SUCCESS, DELETE_SERVICES_FAIL, DELETE_SERVICES_REQUEST } from "../constants/servicesConstants";

export const getAllServicesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SERVICES_REQUEST:
            return { loading: true }
        case GET_SERVICES_SUCCESS:
            return { loading: false, services: action.payload }
        case GET_SERVICES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteServiceReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SERVICES_REQUEST:
            return { loading: true }
        case DELETE_SERVICES_SUCCESS:
            return { loading: false, success: true }
        case DELETE_SERVICES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createServiceReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_SERVICES_REQUEST:
            return { loading: true }
        case CREATE_SERVICES_SUCCESS:
            return { loading: false, service: action.payload }
        case CREATE_SERVICES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

