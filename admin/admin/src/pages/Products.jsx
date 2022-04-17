import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import productList from "../assets/JsonData/product-list.json";
import Table from "../components/table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form } from "react-bootstrap";

const Products = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const productTableHead = [
    "",
    "image",
    "Category",
    "Name",
    "Quantity in stock",
    "Price",
    "In stock",
    "Action",
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>
        {" "}
        <img src={item.name} alt="company logo" style={{ width: "40%" }} />{" "}
      </td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.total_orders}</td>
      <td>{item.total_spend}</td>
      <td>{item.location}</td>
      <td className="d-flex flex-row">
        <IconButton aria-label="delete" size="large">
          <EditIcon
            onClick={handleShowEdit}
            fontSize="small"
            style={{ color: "blue" }}
          />
        </IconButton>
        <IconButton aria-label="delete" size="large">
          <DeleteIcon fontSize="small" style={{ color: "red" }} />
        </IconButton>
      </td>
    </tr>
  );

  return (
    <>
      <h2 className="page-header">products</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Add Product
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={productTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={productList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* modal add product */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="pick image"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Category"
                  type="text"
                  name="category"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
              </Col>
              <Col>
                <Form.Control
                  placeholder="quantity"
                  type="number"
                  name="quantity"
                />
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control placeholder="Price" type="number" name="price" />
              </Col>

              <Col>
                <Form.Check
                  inline
                  label="Instock"
                  name="group1"
                  type="radio"
                  //id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  name="group1"
                  label="No Instock"
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
                Add Product
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End modal add product */}

      {/*  modal update product */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="pick image"
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Category"
                  type="text"
                  name="category"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
              </Col>
              <Col>
                <Form.Control
                  placeholder="quantity"
                  type="number"
                  name="quantity"
                />
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control placeholder="Price" type="number" name="price" />
              </Col>

              <Col>
                <Form.Check
                  inline
                  label="Instock"
                  name="group1"
                  type="radio"
                  //id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  name="group1"
                  label="No Instock"
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
                Update Product
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
