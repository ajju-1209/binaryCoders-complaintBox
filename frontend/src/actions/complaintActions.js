import axios from 'axios'
import { CREATE_COMPLAINT_REQUEST, CREATE_COMPLAINT_SUCCESS, CREATE_COMPLAINT_FAIL, GET_COMPLAINTS_REQUEST, GET_COMPLAINTS_SUCCESS, GET_COMPLAINTS_FAIL, DELETE_COMPLAINT_FAIL, DELETE_COMPLAINT_REQUEST, DELETE_COMPLAINT_SUCCESS, GET_COMPLAINTS_WORKER_FAIL, GET_COMPLAINTS_WORKER_REQUEST, GET_COMPLAINTS_WORKER_SUCCESS, UPDATE_COMPLAINT_SOLVED_FAIL, UPDATE_COMPLAINT_SOLVED_REQUEST, UPDATE_COMPLAINT_SOLVED_SUCCESS,GET_COMPLAINTS_ADMIN_FAIL, GET_COMPLAINTS_ADMIN_REQUEST, GET_COMPLAINTS_ADMIN_SUCCESS,UPDATE_COMPLAINT_ASSIGNED_FAIL, UPDATE_COMPLAINT_ASSIGNED_REQUEST, UPDATE_COMPLAINT_ASSIGNED_SUCCESS } from '../constants/complaintConstants'

const createComplaint = (type, descriptionCustom, descriptionStandard, issueType) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_COMPLAINT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/complaints/create', { complaintType: type, descriptionStandard, descriptionCustom, issueType }, config)

        dispatch({
            type: CREATE_COMPLAINT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_COMPLAINT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const getComplaints = (filters, department) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_COMPLAINTS_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let Data
        if (filters.length === 0 && department.length === 0)
            Data = await axios.get('/api/complaints/resident/get', config)
        else if (filters.length === 0 && department.length !== 0)
            Data = await axios.get(`/api/complaints/resident/get?issueType=${department.join('&issueType=')}`, config)
        else if (filters.length !== 0 && department.length === 0)
            Data = await axios.get(`/api/complaints/resident/get?status=${filters.join('&status=')}`, config)
        else
            Data = await axios.get(`/api/complaints/resident/get?status=${filters.join('&status=')}&issueType=${department.join('&issueType=')}`, config)

        const { data } = Data
        dispatch({
            type: GET_COMPLAINTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_COMPLAINTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const deleteComplaint = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_COMPLAINT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch(`/api/complaints/delete/${id}`, {}, config)

        dispatch({
            type: DELETE_COMPLAINT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_COMPLAINT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const getComplaintsWorker = (status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_COMPLAINTS_WORKER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/complaints/worker/get?status=${status.join('&status=')}`, config)
        dispatch({
            type: GET_COMPLAINTS_WORKER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_COMPLAINTS_WORKER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const updateComplaintSolved = (id) => async(dispatch,getState) => {
    try {
        dispatch({
            type: UPDATE_COMPLAINT_SOLVED_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch('/api/complaints/worker/update',{id}, config)
        dispatch({
            type: UPDATE_COMPLAINT_SOLVED_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_COMPLAINT_SOLVED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const getComplaintsAdmin = (status, department, complaintType) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_COMPLAINTS_ADMIN_REQUEST
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let Data
        if (status.length === 0 && department.length === 0 && complaintType.length === 0)
            Data = await axios.get('/api/users/admin/getUsers', config)
        else if (status.length === 0 && department.length !== 0)
            Data = await axios.get(`/api/complaints/admin/get?issueType=${department.join('&issueType=')}&complaintType=${complaintType}`, config)
        else if (status.length !== 0 && department.length === 0)
            Data = await axios.get(`/api/complaints/admin/get?status=${status.join('&status=')}&complaintType=${complaintType}`, config)
        else
            Data = await axios.get(`/api/complaints/admin/get?status=${status.join('&status=')}&issueType=${department.join('&issueType=')}&complaintType=${complaintType}`, config)

        const { data } = Data
        dispatch({
            type: GET_COMPLAINTS_ADMIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_COMPLAINTS_ADMIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

const updateComplaintAssigned = (id,email) => async(dispatch,getState) => {
    try{
        dispatch({
            type: UPDATE_COMPLAINT_ASSIGNED_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.patch('/api/complaints/admin/update',{id: id,email: email}, config)
        dispatch({
            type: UPDATE_COMPLAINT_ASSIGNED_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: UPDATE_COMPLAINT_ASSIGNED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export { createComplaint, getComplaints, deleteComplaint, getComplaintsWorker,updateComplaintSolved,getComplaintsAdmin,updateComplaintAssigned }