import { GET_ALL_ANNOUNCEMENT_FAIL, GET_ALL_ANNOUNCEMENT_SUCCESS, GET_ALL_ANNOUNCEMENT_REQUEST, DELETE_ANNOUNCEMENT_FAIL, DELETE_ANNOUNCEMENT_SUCCESS, DELETE_ANNOUNCEMENT_REQUEST, CREATE_ANNOUNCEMENT_FAIL, CREATE_ANNOUNCEMENT_SUCCESS, CREATE_ANNOUNCEMENT_REQUEST, UPDATE_ANNOUNCEMENT_FAIL, UPDATE_ANNOUNCEMENT_SUCCESS, UPDATE_ANNOUNCEMENT_REQUEST } from "../constants/announcementConstants";
import axios from 'axios'

const getAllAnnouncements = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_ANNOUNCEMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/announcements/getAll', config)

        dispatch({
            type: GET_ALL_ANNOUNCEMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_ANNOUNCEMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

const deleteAnnouncement = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ANNOUNCEMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const data = await axios.delete(`/api/announcements/${id}`, config)

        dispatch({
            type: DELETE_ANNOUNCEMENT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: DELETE_ANNOUNCEMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

const createAnnouncement = (description) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ANNOUNCEMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/announcements/create', { description: description }, config)
        dispatch({
            type: CREATE_ANNOUNCEMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ANNOUNCEMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

const updateAnnouncement = (description, id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ANNOUNCEMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch('/api/announcements/update', { description: description, id: id }, config)
        dispatch({
            type: UPDATE_ANNOUNCEMENT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ANNOUNCEMENT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export { getAllAnnouncements, deleteAnnouncement, createAnnouncement, updateAnnouncement }