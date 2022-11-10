import { GET_ALL_ANNOUNCEMENT_FAIL, GET_ALL_ANNOUNCEMENT_SUCCESS, GET_ALL_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_FAIL, DELETE_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_REQUEST, UPDATE_ANNOUNCEMENT_FAIL, UPDATE_ANNOUNCEMENT_SUCCESS, UPDATE_ANNOUNCEMENT_REQUEST, CREATE_ANNOUNCEMENT_FAIL, CREATE_ANNOUNCEMENT_SUCCESS, CREATE_ANNOUNCEMENT_REQUEST } from "../constants/announcementConstants";

export const getAllAnnouncementsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ANNOUNCEMENT_REQUEST:
            return { loading: true }
        case GET_ALL_ANNOUNCEMENT_SUCCESS:
            return { loading: false, announcements: action.payload }
        case GET_ALL_ANNOUNCEMENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteAnnouncementReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ANNOUNCEMENT_REQUEST:
            return { loading: true }
        case DELETE_ANNOUNCEMENT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_ANNOUNCEMENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateAnnouncementReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ANNOUNCEMENT_REQUEST:
            return { loading: true }
        case UPDATE_ANNOUNCEMENT_SUCCESS:
            return { loading: false, successUpdate: true }
        case UPDATE_ANNOUNCEMENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const createAnnouncementReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ANNOUNCEMENT_REQUEST:
            return { loading: true }
        case CREATE_ANNOUNCEMENT_SUCCESS:
            return { loading: false, success: true, announcement: action.payload }
        case CREATE_ANNOUNCEMENT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}