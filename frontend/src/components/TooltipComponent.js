import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { Typography } from "@mui/material";
const TooltipComponent = ({ workerData }) => {
  const text = (
    <React.Fragment>
      <Typography sx={{ p: 1 }}>
        <b>Email ID : </b>
        {workerData.email}
      </Typography>
      <Typography sx={{ p: 1 }}>
        <b>Phone Number : </b>
        {workerData.phoneNumber}
      </Typography>
      <Typography sx={{ p: 1 }}>
        <b>Experience: </b>
        {workerData.workerInfo.experience}
      </Typography>
    </React.Fragment>
  );
  return (
    <div>
      <Tooltip disableFocusListener title={text}>
        <Button></Button>
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
