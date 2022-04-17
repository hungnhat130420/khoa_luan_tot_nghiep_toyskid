import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Avatar from "@mui/material/Avatar";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonBootstrap from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Form action="">
        <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            <Box gridColumn="span 4">
              {" "}
              <div
                style={{
                  marginLeft: "52px",
                }}
              >
                <input
                  accept="image/*"
                  id="contained-button-file"
                  name="file"
                  style={{ display: "none" }}
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <Badge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      badgeContent={
                        <PhotoCamera
                          style={{ fontSize: "27px", color: "green" }}
                        />
                      }
                    >
                      <Avatar
                        style={{
                          width: "150px",
                          height: "150px",
                        }}
                        variant="circle"
                      ></Avatar>
                    </Badge>
                  </IconButton>
                </label>
              </div>
            </Box>

            <Box gridColumn="span 8">
              <Grid container spacing={2}>
                <Grid item xs={7}>
                  <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    //disabled={true}
                    //value={phone}
                    //onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    id="date"
                    label="Birthday"
                    fullWidth
                    type="date"
                    name="ngaysinh"
                    //value={selectedDate}
                    //onChange={(e) => setSelectedDate(e.target.value)}
                    //className={classes.textField}

                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: "1940-01-01",
                      max: "1995-01-01",
                    }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <label>Giới tính :</label>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <br />
                      <label>Nam: </label>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        //checked={gender === "Nam"}
                        style={{ transform: "scale(1.5)" }}
                        // onChange={(e) => setGender(e.target.value)}
                      />
                      <label>Nữ: </label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        //checked={gender === "Nữ"}
                        style={{ transform: "scale(1.5)" }}
                        //onChange={(e) => setGender(e.target.value)}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    //disabled={true}
                    //value={phone}
                    //onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    //disabled={true}
                    //value={phone}
                    //onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Password"
                      fullWidth
                      disabled={true}
                      //value={phone}
                      //onChange={(e) => setPhone(e.target.value)}
                    />
                    <Button
                      style={{ fontSize: "12px", backgroundColor: "green" }}
                      variant="contained"
                      onClick={handleShow}
                    >
                      Edit
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={7}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      style={{ fontSize: "12px", width: "60px;" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                    <Button
                      style={{ fontSize: "11px", width: "50px;" }}
                      variant="contained"
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Form>

      {/* modal change passsword */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="oldPassword"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              name="newPassword"
            >
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="renewPassword"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Renew Password</Form.Label>
              <Form.Control type="password" placeholder="Renew Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Button
                style={{
                  fontSize: "15px",
                  backgroundColor: "green",
                }}
                variant="contained"
                type="submit"
              >
                Change password
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
