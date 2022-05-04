import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import categoryList from "../assets/JsonData/categories-list.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import brandAPI from "../api/brandAPI";

export const Brands = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const [listBrand, setListBrand] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [valueBrand, setValueBrand] = useState("");
  const handleDeleteClose = () => setShowDelete(false);

  useEffect(() => {
    const fetchGetAllBrand = async () => {
      try {
        const getAllBrand = await brandAPI.getallbrand();

        console.log(getAllBrand.result);
        setListBrand(getAllBrand.result);

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllBrand();
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
                await brandAPI.deletebrand(
                  { _id: valueBrand._id },
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

      <h2 className="page-header">Quản lý thương hiệu</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Thêm thương hiệu
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã thương hiệu</th>
                    <th>Tên thương hiệu</th>
                    <th>Quốc gia</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {listBrand.map((item, i) => (
                    <tr key={i}>
                      <td>{item._id}</td>
                      <td>{item.brandName}</td>
                      <td>{item.nation}</td>

                      <td>
                        {" "}
                        <IconButton aria-label="delete" size="large">
                          <EditIcon
                            onClick={handleShowEdit}
                            fontSize="small"
                            style={{ color: "blue" }}
                          />
                        </IconButton>
                        <IconButton aria-label="delete" size="large">
                          <DeleteIcon
                            fontSize="small"
                            style={{ color: "red" }}
                            onClick={() => {
                              setValueBrand(item);
                              setShowDelete(true);
                            }}
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

      {/* modal add brand */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Thêm thương hiệu </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
              </Col>
              <Col>
                <Form.Control placeholder="Nation" type="text" name="nation" />
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
                Thêm thươnng hiệu
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* modal update brand */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Cập nhật thương hiệu </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
              </Col>
              <Col>
                <Form.Control placeholder="Nation" type="text" name="nation" />
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
                Cập nhật thương hiệu
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
