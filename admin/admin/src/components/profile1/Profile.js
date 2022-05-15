import React, { useState, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import userAPI from "../../api/userAPI";
import authAPI from "../../api/authAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user_admin"));

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [birthday, setBirthday] = useState(
    !user.birthday ? null : new Date(user.birthday)
  );

  const [startDate, setStartDate] = useState(new Date(user.birthday));
  const [gender, setGender] = useState(!user.gender ? null : user.gender);
  console.log("user", user);
  const changeCheckGender = () => {
    setGender(!gender);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const updateUser = await userAPI.updateuser(
        {
          fullName: fullName,
          birthday: startDate,
          gender: gender,
          email: email,
          phone: phone,
        },
        localStorage.getItem("user_admin")
      );
      window.location.reload(false);
      if (updateUser.success === true) {
        localStorage.setItem("user_admin", JSON.stringify(updateUser.result));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={handleUpdateUser}>
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
                    label="Tên đầy đủ"
                    name="name"
                    fullWidth
                    //disabled={true}
                    value={fullName}
                    variant="outlined"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  {/* <Form.Label>Tên đầy đủ:</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  /> */}
                </Grid>
                <Grid item xs={7}>
                  <Form.Label>Ngày sinh:</Form.Label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    customInput={<Form.Control type="text" />}
                  ></DatePicker>
                </Grid>
                <Grid item xs={7}>
                  <Form.Label>Giới tinh:</Form.Label>
                  <div className="d-flex flex-row">
                    <Form.Check
                      className="me-2"
                      type="radio"
                      aria-label="radio 1"
                      name="abc"
                      defaultChecked={user.gender == false ? false : gender}
                      onChange={changeCheckGender}
                    />
                    <p className="me-5">Nam</p>
                    <Form.Check
                      className="me-2"
                      type="radio"
                      aria-label="radio 1"
                      name="abc"
                      defaultChecked={user.gender == true ? false : !gender}
                      onChange={changeCheckGender}
                    />
                    <p>Nữ</p>
                  </div>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    //disabled={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    name="phone"
                    variant="outlined"
                    label="Phone"
                    fullWidth
                    //disabled={true}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Mật khẩu"
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
                      Chỉnh sửa
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
                      //onClick={handleUpdateUser}
                    >
                      Lưu
                    </Button>
                    <Button
                      style={{ fontSize: "11px", width: "50px;" }}
                      variant="contained"
                      color="error"
                      onClick={() => history.push("/")}
                    >
                      Hủy
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </form>

      {/* modal change passsword */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control
                type="password"
                //placeholder="Password"
                name="oldPassword"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              name="newPassword"
            >
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control
                type="password"
                //placeholder="New Password"
                name="renewPassword"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control type="password" />
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
                Lưu
              </Button>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Profile;
