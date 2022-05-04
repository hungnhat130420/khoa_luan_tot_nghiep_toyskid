import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import categoryList from "../assets/JsonData/categories-list.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import categoryAPI from "../api/categoryAPI";

export const Categories = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const [showDelete, setShowDelete] = useState(false);
  const [valueCategory, setValueCategory] = useState("");
  const handleDeleteClose = () => setShowDelete(false);
  const handleCloseEdit = () => setShowEdit(false);

  const [listCategory, setListCategory] = useState([]);
  useEffect(() => {
    const fetchGetAllCategory = async () => {
      try {
        const getAllCategory = await categoryAPI.getallcategory();

        console.log(getAllCategory.result);
        setListCategory(getAllCategory.result);

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllCategory();
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
                await categoryAPI.deletecategory(
                  { _id: valueCategory._id },
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

      <h2 className="page-header">Quản lý loại sản phẩm</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{ backgroundColor: "blue", color: "white", fontSize: "18px" }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Thêm loại sản phẩm
        </Button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Mã loại</th>
                    <th>Tên loại</th>
                    <th>Hành đông</th>
                  </tr>
                </thead>
                <tbody>
                  {listCategory.map((item, i) => (
                    <tr key={i}>
                      <td>{item._id}</td>
                      <td>{item.categoryName}</td>

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
                              setValueCategory(item);
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

      {/* modal add category */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
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
                Thêm loại sản phẩm
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End modal add product */}

      {/* modal update category */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Control placeholder="Name" type="text" name="name" />
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
                Cập nhật loại sản phẩm
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* End modal update product */}
    </>
  );
};
