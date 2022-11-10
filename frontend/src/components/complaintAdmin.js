import React, { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    Box,
    CardContent,
    Typography,
    Popover,
    Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateComplaintAssigned } from "../actions/complaintActions";
import Message from "./Message";
import TooltipComponent from "./TooltipComponent";

const ComplaintAdmin = ({ complaintData, allWorkers }) => {
    const dispatch = useDispatch();
    const { success } = useSelector((state) => state.updateComplaintAssigned);

    const workers = allWorkers.filter(
        (worker) => worker.userRole === complaintData.issueType
    );

    const [assignTo, setAssignTo] = React.useState("");

    const handleChange = (event) => {
        setAssignTo(event.target.value);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);

    const handleAssign = () => {
        dispatch(updateComplaintAssigned(complaintData.id, assignTo));
    };
    return (
        <div>
            {success && (
                <Message severity="success" open={true} message="Complaint Assigned" />
            )}
            <Card
                variant="outlined"
                sx={{ margin: "2% 10% 2% 25%", maxWidth: "800px" }}
            >
                <CardContent>
                    <Typography>
                        <b>Name : </b>
                        {complaintData.complaintCreatorInfo.firstName}
                    </Typography>
                    <Typography>
                        <b>Email ID:</b>
                        {complaintData.createdBy}
                    </Typography>
                    <Typography>
                        <b>Phone Number : </b>
                        {complaintData.complaintCreatorInfo.phoneNumber}
                    </Typography>
                    <Typography>
                        <b>Address : </b>
                        {complaintData.complaintCreatorInfo.address}
                    </Typography>
                    <Typography>
                        <b>Complaint : </b>
                        {complaintData.descriptionCustom}
                    </Typography>
                    <Typography>
                        <b>Department : </b>
                        {complaintData.issueType}
                    </Typography>
                    <Box sx={{ maxWidth: 150, marginTop: "2%" }}>
                        <FormControl fullWidth>
                            <InputLabel id="assignMenu">ASSIGN TO</InputLabel>
                            <Select
                                labelId="assignMenu"
                                id="assignMenu"
                                value={assignTo}
                                label="assignTo"
                                onChange={handleChange}
                                sx={{ width: "200px" }}
                            >
                                {workers &&
                                    workers.map((worker) => (
                                        <MenuItem value={worker.email} key={worker.email}>
                                            {worker.firstName}
                                            <TooltipComponent workerData={worker} />
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: "85%" }}
                        onClick={handleAssign}
                    >
                        ASSIGN
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ComplaintAdmin;
