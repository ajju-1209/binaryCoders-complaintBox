import React, { useState, useEffect } from 'react'
import AdminMenu from '../components/adminMenu'
import { Grid, Dialog, DialogTitle, DialogContent, FormControl, DialogActions, Button, Checkbox, FormControlLabel, Typography, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { createService, getAllServices } from '../actions/servicesActions'
import { useNavigate } from 'react-router-dom'
import { getRoles } from '../actions/userRoleActions'
import Service from '../components/Service'
import Loader from '../components/Loader'

const ServicesScreen = () => {
    const Roles = useSelector(state => state.getRoles)
    const { roles } = Roles

    const { loading, services } = useSelector(state => state.getAllServices)

    const { service } = useSelector(state => state.createService)

    const [open, setOpen] = React.useState(false)
    const [department, setDepartment] = useState('')
    const [description, setDescription] = useState('')

    const [departmentChecked, setDepartmentChecked] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleRefreshServices = () => {
        dispatch(getAllServices([]))
    }

    const handleChange = (e) => {
        setDepartment(e.target.value)
    }

    const handleCreateService = () => {
        dispatch(createService(description, department))
        setDepartment('')
        setDescription('')
    }

    useEffect(() => {
        if (!userInfo)
            navigate('/login')
        if (!services)
            handleRefreshServices()
        if (!roles)
            dispatch(getRoles(['admin', 'resident']))
        if (service)
            handleRefreshServices()
    }, [service])

    const handleChecked = (event, key) => {
        if (event.target.checked) {
            setDepartmentChecked(prevState => [...prevState, key])
        } else if (!event.target.checked) {
            setDepartmentChecked(prevstate => prevstate.filter(s => s !== key))
        }
    }

    const handleFILTER = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        handleClose()
        dispatch(getAllServices(departmentChecked))
        setDepartmentChecked([])
    };

    return (
        <div>
            <AdminMenu />
            {loading && <Loader />}
            <Dialog open={open}>
                <DialogTitle>FILTER</DialogTitle>
                <DialogContent>
                    <FormControl>
                        {roles && roles.map(role => <FormControlLabel value={role.slug} control={<Checkbox onChange={e => handleChecked(e, role.slug)} />} label={role.name} key={role._id} />)}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} >Filter</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={2} component="main" sx={{ flexGrow: 1, p: 3, width: { sm: 'calc(100% - 240px)' }, margin: "0 0 0 17%" }} justify-content="center" align-items="center">
                <Button onClick={handleFILTER} variant="contained" color="success" sx={{ marginLeft: "90%" }}>FILTER</Button>
                <Grid item md={6}>
                    <Grid container direction="row">
                        {services && services.map(service => (<Grid item md={12} key={service.slug}>
                            <Service serviceData={service} refresh={handleRefreshServices} />
                        </Grid>))}
                    </Grid>
                </Grid>
                <Grid item md={6} >
                    <Typography
                        variant="h5"
                        textAlign={"center"}
                        sx={{
                            color: "#283593",
                            fontFamily: "Arizonia",
                            marginBottom: 0,
                            marginTop: "1px",
                        }}> CREATE SERVICE</Typography>
                    <FormControl sx={{ width: "80%", marginTop: "1%", marginLeft: "4%" }}
                        variant="outlined">
                        <InputLabel htmlFor="department">Department</InputLabel>
                        <Select
                            labelId="department"
                            id="department"
                            value={department}
                            label="department"
                            onChange={handleChange}
                            name="department"
                        >
                            {roles && roles.map(role => (<MenuItem value={role.slug} key={role.slug}>{role.name}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <TextField
                        id="description"
                        label="Descritpion"
                        multiline
                        maxRows={4}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        sx={{ width: "80%", marginTop: "2%", marginLeft: "4%" }}
                    />
                    <Button variant="contained" color="success" sx={{ marginLeft: '35%', marginTop: '3%' }} onClick={handleCreateService}>CREATE</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default ServicesScreen