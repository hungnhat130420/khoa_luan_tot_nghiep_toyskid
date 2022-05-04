import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import productAPI from "../api/productAPI";

const Products = () => {
  const accessToken = localStorage.getItem("accessToken_admin");
  localStorage.getItem("user_admin");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [valueProduct, setValueProduct] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseEdit = () => setShowEdit(false);

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);

  const [listProduct, setListProduct] = useState([]);
  const handleDelete = () => {
    console.log("click");
    handleDeleteClose();
  };
  useEffect(() => {
    const fetchGetAllProduct = async () => {
      try {
        const getAllProduct = await productAPI.getallproduct();

        //console.log(getAllProduct.result);
        setListProduct(getAllProduct.result);

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllProduct();
  }, []);
  return (
    <>
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header>Bạn có chắc chắn muốn xoá ?</Modal.Header>
        <Modal.Footer>
          <Button
            style={{
              fontSize: "13px",
              backgroundColor: "red",
              marginRight: "10px",
            }}
            variant="contained"
            type="submit"
            onClick={async () => {
              try {
                await productAPI.deleteproduct(
                  { _id: valueProduct._id },
                  localStorage.getItem("accessToken_admin")
                );
                setShowDelete(false);

                window.location.reload(false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Xóa
          </Button>

          <Button
            style={{
              fontSize: "13px",
              backgroundColor: "gray",
            }}
            variant="contained"
            onClick={handleDeleteClose}
          >
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className="page-header">Quản lý sản phẩm</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Thêm sản phẩm
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Hình ảnh</th>

                    <th>Tên sản phẩm</th>
                    <th>Số lượng tồn</th>
                    <th>Giá</th>
                    <th>Tình trạng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{item._id}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity > 0 ? "Còn hàng" : "Hết hàng"} </td>
                        <td>
                          {" "}
                          <IconButton aria-label="delete" size="large">
                            <EditIcon
                              onClick={() => {
                                setValueProduct(item);
                                console.log(item._id);
                                setShowDelete(true);
                              }}
                              fontSize="small"
                              style={{ color: "blue" }}
                            />
                          </IconButton>
                          <IconButton aria-label="delete" size="large">
                            <DeleteIcon
                              fontSize="small"
                              style={{ color: "red" }}
                              onClick={() => {
                                setValueProduct(item);
                                setShowDelete(true);
                              }}
                            />
                          </IconButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* modal add product */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
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
                Thêm sản phẩm
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End modal add product */}

      {/*  modal update product */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật sản phẩm</Modal.Title>
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
                Cập nhật
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
