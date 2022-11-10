import React from 'react'
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Complaints from '../components/complaints.js'
import Header from '../components/header.js';
import { Typography, Divider, Button } from '@mui/material'
import RegisterComplaint from "../components/RegisterComplaint";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../actions/userRoleActions'
import { getComplaints } from '../actions/complaintActions.js';
import Loader from '../components/Loader.js'
import { useNavigate } from 'react-router-dom';

const ComplaintScreen = () => {
  const [filters, setFilters] = useState([]);

  const Roles = useSelector(state => state.getRoles)
  const { roles } = Roles

  const allComplaints = useSelector(state => state.getComplaints)
  const { loading, complaints } = allComplaints

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (event) => {
    if (event.target.checked) {
      setFilters(prevState => [...prevState, event.target.value])
    } else if (!event.target.checked) {
      setFilters(prevstate => prevstate.filter(s => s !== event.target.value))
    }
  }

  const [departmentChecked, setDepartmentChecked] = useState([])

  const handleChecked = (event, key) => {
    if (event.target.checked) {
      setDepartmentChecked(prevState => [...prevState, key])
    } else if (!event.target.checked) {
      setDepartmentChecked(prevstate => prevstate.filter(s => s !== key))
    }
  }

  useEffect(() => {
    if (!userInfo)
      navigate('/login')
    if (!roles)
      dispatch(getRoles(['admin', 'resident']))
    if (!complaints)
      dispatch(getComplaints(['Pending', 'Assigned', 'Solved'], departmentChecked))
  }, [complaints])

  const applyFilter = () => {
    console.log(filters)
    dispatch(getComplaints(filters, departmentChecked))
  }

  return (
    <div>
      <Header />
      <Grid container direction="row" spacing={2} marginLeft="2px">
        <Grid item xs={2} sx={{ margin: "5% 0 0 2%", height: '88vh' }}>
          <Typography
            variant="h5"
            padding={1}
            sx={{
              color: "#283593",
              fontFamily: "Arizonia",
              marginBottom: 0,
              marginTop: "1px",
            }}
          >FILTER</Typography>
          <Typography variant="body"
            sx={{
              fontFamily: "Arizonia",
              marginBottom: 0,
              marginTop: "10px",
            }}>
            STATUS :
          </Typography>
          <FormControl sx={{ marginTop: "5%" }}>
            <FormControlLabel value="Pending" control={<Checkbox onChange={e => handleChange(e)} />} label="Pending" />

            <FormControlLabel value="Assigned" control={<Checkbox onChange={e => handleChange(e)} />} label="Assigned" />

            <FormControlLabel value="Solved" control={<Checkbox onChange={e => handleChange(e)} />} label="Solved" />
          </FormControl>

          <Typography variant="body"
            sx={{
              fontFamily: "Arizonia",
              marginBottom: 0,
              marginTop: "1px",
            }}>
            DEPARTMENT :
          </Typography>
          {roles && roles.map(role => <FormControlLabel value={role.slug} control={<Checkbox onChange={e => handleChecked(e, role.slug)} />} label={role.name} key={role._id} />)}
          <Button color="success" onClick={applyFilter} variant="contained">APPLY FILTER</Button>
        </Grid>
        <Divider orientation="vertical" flexItem={true} />
        <Grid item xs={6} sx={{ textAlign: "center", margin: "7% 0 0 0" }}>
          {loading && <Loader />}
          {!loading && complaints && complaints.map(complaint => (<Complaints complaintData={complaint} key={complaint.id} />))}
        </Grid>
        <Divider orientation="vertical" flexItem={true} />
        <Grid item md={3} sx={{ margin: "6% 2% 0 2%" }}>
          <DynamicFeedIcon sx={{ margin: "0 45%" }} fontSize="large" />
          <Typography
            variant="h5"
            textAlign={"center"}
            padding={1}
            sx={{
              color: "#283593",
              fontFamily: "Arizonia",
            }}
          >
            REGISTER A COMPLAINT
          </Typography>
          <RegisterComplaint />
        </Grid>
      </Grid>
    </div>
  )
}

export default ComplaintScreen;
