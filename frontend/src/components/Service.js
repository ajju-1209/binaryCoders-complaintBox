import React, { useEffect } from 'react'
import { Card, CardContent, Button, Grid, Chip } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { deleteService } from '../actions/servicesActions';
import Message from './Message'
const Service = ({ serviceData, refresh }) => {
    const { success } = useSelector(state => state.deleteService)

    const dispatch = useDispatch()

    const handleDeleteService = () => {
        dispatch(deleteService(serviceData.slug))
        refresh()
    }

    // useEffect(() => {
    //     if (success)
    //         refresh()
    // }, [success])
    return (
        <div>
            {success && <Message open={true} severity="success" message="Service Deleted" />}
            <Card sx={{ margin: "2%" }}>
                <CardContent>
                    <Grid container direction="row" spacing={2}>
                        <Grid item md={12}>
                            {serviceData.description}
                        </Grid>
                        <Grid item md={12}>
                            <Grid container>
                                <Grid item md={6}><Chip label={serviceData.name} color="primary" variant="outlined" /></Grid>
                                <Grid item md={6}><Button variant="contained" color="success" onClick={handleDeleteService}>DELETE SERVICE</Button></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default Service