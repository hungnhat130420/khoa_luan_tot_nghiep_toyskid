import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

// import Table from "../components/table/Table";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "../components/topnav/topnav1.css";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";

import SearchIcon from "@mui/icons-material/Search";
import ReactPaginate from "react-paginate";
import userAPI from "../api/userAPI";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../components/css/product.css";
import Notifycation from "../components/alert/Notifycation";
const Customers = () => {
  const accessToken = localStorage.getItem("accessToken_admin");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  localStorage.getItem("user_admin");
  const [listUser, setListUser] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);

  // pagimation
  const [pageNumber, setPageNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listUser.length / userPerPage);

  useEffect(() => {
    const fetchGetAll = async () => {
      try {
        const getAllUser = await userAPI.getAllUser();
        setListUser(getAllUser.result);
        setUsers(listUser.slice(0, 200));
        setDisplayPerPage(
          users.slice(pagesVisited, pagesVisited + userPerPage)
        );
        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAll();
  }, [listUser]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    //console.log(pageNumber);
  };

  // console.log(localStorage.getItem("accessToken_admin"));
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [search, setSearch] = useState("");
  const [valueCustomer, setValueCustomer] = useState("");
  const handleShow = () => setShow(true);

  // const handUpdateRole = async () => {
  //   try {
  //     await userAPI.updateuserrole(
  //       {
  //         _id: valueCustomer._id,
  //         role: valueCustomer.role,
  //       },
  //       localStorage.getItem("accessToken_admin")
  //     );
  //     set;
  //     setNotify({
  //       isOpen: true,
  //       message: "Cập nhật thành công ",
  //       type: "success",
  //     });
  //     window.location.reload(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {valueCustomer.role == 2 ? (
        <Modal show={showDelete}>
          <Modal.Header>
            Bạn có chắc chắn muốn khóa tài khoản này ?
          </Modal.Header>
          <Modal.Footer>
            <Button
              style={{
                fontSize: "13px",
                backgroundColor: "#EEC900",
                marginRight: "10px",
              }}
              variant="contained"
              type="submit"
              onClick={async () => {
                try {
                  await userAPI.updateuserrole(
                    {
                      userID: valueCustomer._id,
                      role: 3,
                    },
                    localStorage.getItem("accessToken_admin")
                  );
                  setShowDelete(false);
                  setNotify({
                    isOpen: true,
                    message: "Cập nhật thành công ",
                    type: "success",
                  });
                  window.location.reload(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Khóa
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
      ) : (
        <Modal show={showDelete}>
          <Modal.Header>Bạn có chắc chắn mở khóa tài khoản này ?</Modal.Header>
          <Modal.Footer>
            <Button
              style={{
                fontSize: "13px",
                backgroundColor: "#EEC900",
                marginRight: "10px",
              }}
              variant="contained"
              type="submit"
              onClick={async () => {
                try {
                  await userAPI.updateuserrole(
                    {
                      userID: valueCustomer._id,
                      role: 2,
                    },
                    localStorage.getItem("accessToken_admin")
                  );
                  setShowDelete(false);
                  setNotify({
                    isOpen: true,
                    message: "Cập nhật thành công ",
                    type: "success",
                  });
                  window.location.reload(false);
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Khóa
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
      )}

      <h2 className="page-header">Quản lý khách hàng</h2>
      <div style={{ padding: "20px" }}>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "18px",
            visibility: "hidden",
          }}
          startIcon={<AddIcon />}
          onClick={handleShow}
        >
          Thêm thương hiệu
        </Button>
        <div
          className="topnav1__search"
          style={{ float: "right", width: "400px" }}
        >
          <input
            type="text"
            placeholder="Nhập mã, tên hoặc email khách hàng cần tìm..."
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
                    <th style={{ textAlign: "center" }}>Mã khách hàng</th>
                    <th style={{ textAlign: "center" }}>Tên đầy đủ</th>
                    <th style={{ textAlign: "center" }}>Số điện thoại</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                    <th style={{ textAlign: "center" }}>Địa chỉ</th>
                    <th style={{ textAlign: "center" }}>Tên đăng nhập</th>
                    <th style={{ textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.fullName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val._id.toLowerCase().includes(search.toLowerCase()) ||
                        val.email
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val.phone.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: "center" }}>{item._id}</td>
                        <td style={{ textAlign: "center" }}>{item.fullName}</td>
                        <td style={{ textAlign: "center" }}>{item.phone}</td>
                        <td style={{ textAlign: "center" }}>{item.email}</td>
                        <td style={{ textAlign: "center" }}>{item.address}</td>
                        <td style={{ textAlign: "center" }}>{item.userName}</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <IconButton aria-label="delete" size="large">
                            {item.role == 2 ? (
                              <LockIcon
                                fontSize="inherit"
                                style={{ color: "gold" }}
                                onClick={() => {
                                  setValueCustomer(item);
                                  console.log(valueCustomer);
                                  setShowDelete(true);
                                }}
                              />
                            ) : (
                              <LockOpenIcon
                                fontSize="inherit"
                                style={{ color: "gold" }}
                                onClick={() => {
                                  setValueCustomer(item);
                                  console.log(valueCustomer);
                                  setShowDelete(true);
                                }}
                              />
                            )}
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
