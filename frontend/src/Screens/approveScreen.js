import React from 'react'
import { Grid } from "@mui/material";
import AdminMenu from '../components/adminMenu';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getRecords } from '../actions/workerFormActions'
import ApproveWorkerCard from '../components/approveWorkerCard'
import Loader from '../components/Loader'

const ApproveScreen = () => {
  const { userInfo } = useSelector(state => state.userLogin)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, records } = useSelector(state => state.getRecords)
  useEffect(() => {
    if (!userInfo)
      navigate('/login')
    if (!records)
      dispatch(getRecords(['Pending']))
  }, [])
  return (
    <div>
      <AdminMenu />
      <Grid container spacing={3} direction="row" sx={{ flexGrow: 1, p: 3, width: { sm: 'calc(100% - 240px)' }, margin: "0 0 0 17%" }}>
        {loading && <Loader />}
        {records && records.map(record => (
          <Grid item key={record.id}>
            <ApproveWorkerCard workerData={record} key={record.id} />
          </Grid>))}
      </Grid>
    </div>
  )
}

export default ApproveScreen;
