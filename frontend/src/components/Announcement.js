import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Message from "./Message";
import {
  deleteAnnouncement,
  updateAnnouncement,
} from "../actions/announcementActions";
import { useLocation } from "react-router-dom";

const Announcement = ({ date, id, children }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(children);
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUpdate = (event) => {
    setUpdate(event.target.value);
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.deleteAnnouncement);
  const { successUpdate } = useSelector((state) => state.updateAnnouncement);
  const handleDeleteAnnouncement = () => {
    dispatch(deleteAnnouncement(id));
  };

  const handleUpdateAnnouncement = () => {
    dispatch(updateAnnouncement(update, id));
    handleClose();
  };

  useEffect(() => {
    if (successUpdate || success) {
      window.location.reload();
    }
  }, [successUpdate, success]);

  const location = useLocation();
  return (
    <Card sx={{ margin: "5% 3% 0 3%" }} variant="outlined" key={id}>
      {openMessage && (
        <Message
          severity="success"
          open={true}
          message="Announcement Deleted"
        />
      )}
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography variant="subtitle1" gutterBottom color="text.primary">
              {children}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color="brown">
              <b>{date}</b>
            </Typography>
          </Grid>
        </Grid>
        {userInfo.userRole === "admin" &&
          location.pathname === "/admin/announcementScreen" && (
            <Grid container direction="row">
              <Divider flexItem={true} />
              <Grid item md={6} sx={{ paddingLeft: "10%" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpen}
                >
                  UPDATE
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        textAlign: "center",
                        color: "#283593",
                        fontFamily: "Arizonia",
                      }}
                    >
                      UPDATE ANNOUNCEMENT
                    </Typography>
                    <TextField
                      value={update}
                      onChange={handleUpdate}
                      multiline
                      maxRows={4}
                      sx={{ width: "35ch" }}
                    ></TextField>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUpdateAnnouncement}
                      sx={{ marginTop: "10px", marginLeft: "70%" }}
                    >
                      UPDATE
                    </Button>
                  </Box>
                </Modal>
              </Grid>
              <Grid item md={6} sx={{ paddingLeft: "10%" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteAnnouncement}
                >
                  DELETE
                </Button>
              </Grid>
            </Grid>
          )}
      </CardContent>
    </Card>
  );
};

export default Announcement;
