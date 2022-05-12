import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import categoryAPI from "../api/categoryAPI";
import Notifycation from "../components/alert/Notifycation";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../components/css/product.css";
import ReactPaginate from "react-paginate";
import SearchIcon from "@mui/icons-material/Search";
import "../components/topnav/topnav1.css";
export const Categories = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const [showDelete, setShowDelete] = useState(false);
  const [valueCategory, setValueCategory] = useState("");
  const handleDeleteClose = () => setShowDelete(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [categoryName, setCategoryName] = useState("");

  const [search, setSearch] = useState("");

  const [listCategory, setListCategory] = useState([]);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    await categoryAPI.addcategory(
      {
        categoryName: categoryName,
      },
      localStorage.getItem("accessToken_admin")
    );
    //history.push("/categories");
    setShow(false);
    window.location.reload(false);
    setNotify({
      isOpen: true,
      message: "Thêm loại sản phẩm thành công",
      type: "success",
    });
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      await categoryAPI.updatecategory(
        { _id: valueCategory._id, categoryName: categoryName },
        localStorage.getItem("accessToken_admin")
      );
      setShowEdit(false);
      setNotify({
        isOpen: true,
        message: "Cập nhật thành công thành công",
        type: "success",
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  // pagimation
  const [pageNumber, setPageNumber] = useState(0);
  const [categories, setCategories] = useState([]);
  const categoryPerPage = 10;
  const pagesVisited = pageNumber * categoryPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listCategory.length / categoryPerPage);

  useEffect(() => {
    const fetchGetAllCategory = async () => {
      try {
        const getAllCategory = await categoryAPI.getallcategory();

        console.log(getAllCategory.result);
        setListCategory(getAllCategory.result);
        setCategories(listCategory.slice(0, 200));
        setDisplayPerPage(
          categories.slice(pagesVisited, pagesVisited + categoryPerPage)
        );

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllCategory();
  }, [listCategory]);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    //console.log(pageNumber);
  };

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
        <div
          className="topnav1__search"
          style={{ float: "right", width: "350px" }}
        >
          <input
            type="text"
            placeholder="Nhập tên và mã cần tìm..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <i>
            <IconButton aria-label="delete" size="large">
              <SearchIcon fontSize="inherit" />
            </IconButton>
          </i>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>STT</th>
                    <th style={{ textAlign: "center" }}>Mã loại</th>
                    <th style={{ textAlign: "center" }}>Tên loại</th>
                    <th style={{ textAlign: "center" }}>Hành đông</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.categoryName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val._id.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: "center" }}>{i + 1}</td>
                        <td style={{ textAlign: "center" }}>{item._id}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.categoryName}
                        </td>
                        <td style={{ width: "200px", textAlign: "center" }}>
                          {" "}
                          <IconButton aria-label="delete" size="large">
                            <EditIcon
                              onClick={() => {
                                setValueCategory(item);
                                setShowEdit(true);
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
            <ReactPaginate
              breakLabel="..."
              nextLabel={<ArrowForwardIosIcon />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel={<ArrowBackIosNewIcon />}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>

      {/* modal add category */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST">
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={(e) => setCategoryName(e.target.value)}
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
                onClick={handleAddCategory}
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
          <Form method="POST">
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên loại"
                  type="text"
                  name="name"
                  defaultValue={valueCategory.categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
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
                onClick={handleUpdateCategory}
              >
                Cập nhật loại sản phẩm
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Notifycation notify={notify} setNotify={setNotify} />
      {/* End modal update product */}
    </>
  );
};
