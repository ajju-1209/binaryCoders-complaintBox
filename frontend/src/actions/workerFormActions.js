import axios from 'axios'
import {CREATE_RECORD_REQUEST,CREATE_RECORD_SUCCESS,CREATE_RECORD_FAIL,GET_RECORDS_FAIL,GET_RECORDS_REQUEST,GET_RECORDS_SUCCESS,UPDATE_WORKER_STATUS_FAIL,UPDATE_WORKER_STATUS_REQUEST,UPDATE_WORKER_STATUS_SUCCESS} from '../constants/workerFormConstants'

const createRecord = (profession,experience,referralID) => async(dispatch, getState) => {
    try{
        dispatch({
            type: CREATE_RECORD_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post('/api/workerData/record',{profession,experience,referralID},config)
    dispatch({
        type: CREATE_RECORD_SUCCESS,
        payload: data
    })
    }catch(error) {
        dispatch({
            type: CREATE_RECORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
          })
    }
}

const getRecords = (status) => async(dispatch,getState) => {
  try{
    dispatch({
      type: GET_RECORDS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.get(`/api/workerData/getRecords?status=${status.join('&status=')}`,config)

    dispatch({
      type: GET_RECORDS_SUCCESS,
      payload: data
    })

  }catch(error) {
    dispatch({
      type: GET_RECORDS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

const updateWorkerStatus = (status,id) => async(dispatch,getState) => {
  try{
    dispatch({
      type: UPDATE_WORKER_STATUS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.patch('/api/workerData/update',{status: status, id: id}, config)

    dispatch({
      type: UPDATE_WORKER_STATUS_SUCCESS,
      payload: data
    })

  }catch(error) {
    dispatch({
      type: UPDATE_WORKER_STATUS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export {createRecord,getRecords,updateWorkerStatus}