import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

// import Table from "../components/table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import userAPI from "../api/userAPI";

const Customers = () => {
  const accessToken = localStorage.getItem("accessToken_admin");

  localStorage.getItem("user_admin");
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    const fetchGetAll = async () => {
      try {
        const getAllUser = await userAPI.getAllUser();

        console.log(getAllUser.result);
        setListUser(getAllUser.result);

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAll();
  }, []);

  // console.log(localStorage.getItem("accessToken_admin"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h2 className="page-header">Quản lý khách hàng</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Thêm khách hàng
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã khách hàng</th>
                    <th>Tên đầy đủ</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                    <th>Địa chỉ</th>
                    <th>Tên đăng nhập</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listUser.map((item, i) => (
                    <tr key={i}>
                      <td>{item._id}</td>
                      <td>{item.fullName}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.userName}</td>
                      <td>
                        {" "}
                        <IconButton aria-label="delete" size="large">
                          <LockIcon
                            fontSize="inherit"
                            style={{ color: "gold" }}
                          />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* modal add customer */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
              </Col>
              <Col>
                <Form.Control placeholder="Email" type="text" name="text" />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Phone" type="text" name="phone" />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Address"
                  type="text"
                  name="address"
                />
              </Col>
            </Row>
            <Row className="mb-3 ml-3">
              <Col className="mr-3">
                <Form.Check
                  inline
                  label="Male"
                  name="group1"
                  type="radio"
                  //id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="group1"
                  type="radio"
                  //id={`inline-${type}-2`}
                />
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Button
                style={{
                  fontSize: "15px",
                  backgroundColor: "blue",
                }}
                variant="contained"
                type="submit"
              >
                Add Customer
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Customers;
