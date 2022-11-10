import React from 'react'
import { Card, CardContent, Typography, Grid, Button, Divider, Box } from "@mui/material";
import {useSelector,useDispatch} from 'react-redux'
import {updateUserRole} from '../actions/userActions'
import {updateWorkerStatus} from '../actions/workerFormActions'
import Message from './Message'

const ApproveWorkerCard = ({ workerData }) => {
    const {success,data} = useSelector(state => state.updateWorkerStatus)
    const dispatch = useDispatch()
    const {userRole} = useSelector(state => state.updateUserRole)

    const handleApproveRequest = () => {
        dispatch(updateWorkerStatus('Approved',workerData.id))
        dispatch(updateUserRole(workerData.profession,workerData.email))
    }

    const handleDeclineRequest = () => {
        console.log(workerData.id)
        dispatch(updateWorkerStatus('Declined',workerData.id))
    }
    return (
        <div>
            { success && data.status === 'Declined' && <Message open={true} severity="success" message="Request Declined"/>}
            {userRole && <Message open={true} severity="success" message="Request Approved"/>}
            <Card variant="outlined">
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 'fit-content',
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            '& svg': {
                                m: 1.5,
                            },
                            '& hr': {
                                mx: 0.5,
                            },
                        }}
                    >
                        <Grid container spacing={2} direction='row' sx={{ margin: "0 0 1% 0" }}>
                            <Grid item>
                                <Typography variant="h5">Worker's Info</Typography>
                                <Typography><b>Name:</b>{workerData.formFilledByPersonInfo.firstName}</Typography>
                                <Typography><b>Phone Number:</b>{workerData.formFilledByPersonInfo.phoneNumber}</Typography>
                                <Typography><b>Profession:</b>{workerData.profession}</Typography>
                                <Typography><b>Experience:</b>{workerData.experience}</Typography>

                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item>
                                <Typography variant="h5">Referral's Info</Typography>
                                <Typography><b>Name:</b>{workerData.referralPersonInfo.firstName}</Typography>
                                <Typography><b>Phone Number:</b>{workerData.referralPersonInfo.phoneNumber}</Typography>
                                <Typography><b>Address:</b>{workerData.referralPersonInfo.address}</Typography>
                            </Grid>
                        </Grid>

                    </Box>
                    <Divider flexItem />
                    <Grid container spacing={.5}>
                        <Grid item xs={6}>
                            <Button
                                onClick={handleApproveRequest}
                                type="submit"
                                variant="contained"
                                color="success"
                                sx={{margin: "5% 5% 0 30%"}}
                            >
                                Approve
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                            onClick={handleDeclineRequest}
                                type="submit"
                                variant="contained"
                                color="error"
                                sx={{
                                    margin: "5% 5% 0 30%",
                                }}
                            >
                                Deny
                            </Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    )
}

export default ApproveWorkerCard