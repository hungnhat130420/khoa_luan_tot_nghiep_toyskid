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
export const Profile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user_admin"));
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState(false);
  //const isSignIn = JSON.parse(localStorage.getItem("user_admin"));
  useEffect(() => {
    console.log(user);
    setFullName(user.fullName);
    setEmail(user.email);
    setPhone(user.phone);
    setGender(user.gender);
    setBirthday(user.birthday);
    console.log("fullname", fullName);
    console.log("email", email);
    console.log("phone", phone);
    console.log("birthday", birthday);
  }, [user]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await userAPI.updateuser(
        {
          fullName: fullName,
          birthday: birthday,
          gender: gender,
          email: email,
          phone: phone,
        },
        localStorage.getItem("user_admin")
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleUpdateUser}>
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
                  {/* <TextField
                    label="Tên đầy đủ"
                    name="name"
                    fullWidth
                    //disabled={true}
                    value={fullName}
                    variant="outlined"
                    onChange={(e) => setFullName(e.target.value)}
                  /> */}
                  <Form.Label>Tên đầy đủ:</Form.Label>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    id="date"
                    fullWidth
                    variant="outlined"
                    label="Ngày sinh"
                    type="date"
                    name="ngaysinh"
                    value={birthday.split("T")[0]}
                    onChange={(e) => setBirthday(e.target.value)}
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
                        checked={gender == true}
                        style={{ transform: "scale(1.5)" }}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label>Nữ: </label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={gender == false}
                        style={{ transform: "scale(1.5)" }}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    type="text"
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
