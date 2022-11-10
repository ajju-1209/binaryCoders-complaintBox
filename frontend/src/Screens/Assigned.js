import React from 'react'
import AdminMenu from '../components/adminMenu'
import {Card,  Typography,CardContent } from "@mui/material";
const Assigned = () => {
  return (
    <div>
          <AdminMenu /> 
           <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center", color: "#283593",
                            fontFamily: "Arizonia",}}>COMPLAINTS</Typography>
          <Card sx={{ marginLeft:"25%",maxWidth:"800px",marginTop:"20px" }} variant="outlined">
              <CardContent>
                  <Typography>ISSUED BY:abc</Typography>
                  <Typography>EMAIL_ID:</Typography>
                  <Typography>PH NO: 9873695327</Typography>
                  <Typography>Description:</Typography>
      </CardContent>
          </Card>
    </div>
  )
}

export default Assigned
