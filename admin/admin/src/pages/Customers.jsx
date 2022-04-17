import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import customerList from "../assets/JsonData/customers-list.json";
import Table from "../components/table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form } from "react-bootstrap";

const customerTableHead = [
  "",
  "Name",
  "Email",
  "Phone",
  "Address",
  "Gender",
  "Active",
  "Action",
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
    <td className="d-flex flex-row">
      {" "}
      <IconButton aria-label="delete" size="large">
        <LockIcon fontSize="inherit" style={{ color: "gold" }} />
      </IconButton>
    </td>
  </tr>
);

const Customers = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <h2 className="page-header">customers</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Add Customer
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
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
