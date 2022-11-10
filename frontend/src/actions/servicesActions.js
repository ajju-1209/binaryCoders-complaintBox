import { GET_SERVICES_SUCCESS, GET_SERVICES_FAIL, GET_SERVICES_REQUEST, CREATE_SERVICES_SUCCESS, CREATE_SERVICES_FAIL, CREATE_SERVICES_REQUEST, DELETE_SERVICES_SUCCESS, DELETE_SERVICES_FAIL, DELETE_SERVICES_REQUEST } from "../constants/servicesConstants";
import axios from "axios";

const getAllServices = (includeName) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_SERVICES_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        let Data
        if (includeName.length === 0)
            Data = await axios.get(`/api/services/getAll`, config)
        else
            Data = await axios.get(`/api/services/getAll?includedNames=${includeName.join('&includedNames=')}`, config)
        const { data } = Data
        dispatch({
            type: GET_SERVICES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_SERVICES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

const deleteService = (slug) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_SERVICES_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/services/${slug}`, config)

        dispatch({
            type: DELETE_SERVICES_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: DELETE_SERVICES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

const createService = (description, name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_SERVICES_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/services/create`, { name: name, description: description }, config)

        dispatch({
            type: CREATE_SERVICES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_SERVICES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export { getAllServices, deleteService, createService }