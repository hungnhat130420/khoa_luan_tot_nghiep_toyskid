import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import orderAPI from "../api/orderAPI";
import Notifycation from "../components/alert/Notifycation";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../components/css/product.css";
import ReactPaginate from "react-paginate";
import SearchIcon from "@mui/icons-material/Search";
import "../components/topnav/topnav1.css";
import Badge from "../components/badge/Badge";
export const Orders = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const [showDelete, setShowDelete] = useState(false);
  const [valueOrder, setValueOrder] = useState("");
  const handleDeleteClose = () => setShowDelete(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [status, setStatus] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const orderStatus = {
    shipping: "primary",
    pending: "warning",
    paid: "success",
    refund: "danger",
  };

  const [categoryName, setCategoryName] = useState("");

  const [search, setSearch] = useState("");

  const [listOrder, setListOrder] = useState([]);

  // pagimation
  const [pageNumber, setPageNumber] = useState(0);
  const [orders, setOrders] = useState([]);
  const orderPerPage = 10;
  const pagesVisited = pageNumber * orderPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listOrder.length / orderPerPage);

  useEffect(() => {
    const fetchGetAllOrder = async () => {
      try {
        const getAllOrder = await orderAPI.getallorder();

        setListOrder(getAllOrder.result);
        setOrders(listOrder.slice(0, 200));
        setDisplayPerPage(
          orders.slice(pagesVisited, pagesVisited + orderPerPage)
        );

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllOrder();
  }, [listOrder]);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    //console.log(pageNumber);
  };

  const handleChangeStatus = async (e) => {
    e.preventDefault();

    try {
      await orderAPI.updateorderstatus(
        { _id: valueOrder._id, orderStatus: status },
        localStorage.getItem("accessToken_admin")
      );
      setShowEdit(false);
      setNotify({
        isOpen: true,
        message: "Cập nhật thành công",
        type: "success",
      });
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="page-header">Quản lý đơn hàng</h2>
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
                    <th style={{ textAlign: "center", width: "10px" }}>
                      Mã đơn hàng
                    </th>
                    <th style={{ textAlign: "center" }}>Tên người đặt</th>
                    <th style={{ textAlign: "center" }}>Điện thoại</th>
                    <th style={{ textAlign: "center" }}>Địa chỉ</th>
                    <th style={{ textAlign: "center" }}>Ngày đặt</th>
                    <th style={{ textAlign: "center" }}>Trạng thái</th>
                    <th style={{ textAlign: "center" }}>Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.userName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val._id.toLowerCase().includes(search.toLowerCase()) ||
                        val.userPhone
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: "center" }}>{item._id}</td>
                        <td style={{ textAlign: "center" }}>{item.userName}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.userPhone}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.userAddress}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.dateCreated.split("T")[0]}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.orderStatus == "pending" ? (
                            <span
                              style={{
                                backgroundColor: "#CCCC00",

                                borderRadius: "3px",
                              }}
                            >
                              Đang xử lý
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "3px",
                              }}
                            >
                              Đang vận chuyển
                            </span>
                          )}

                          <span
                            style={{
                              backgroundColor: "#d68102;",
                              color: "white",
                              borderRadius: "3px",
                            }}
                          ></span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {item.orderStatus == "shipping" ? (
                            <IconButton
                              aria-label="delete"
                              size="large"
                              disabled={true}
                            >
                              <EditIcon
                                onClick={() => {
                                  setValueOrder(item);
                                  setStatus(item.orderStatus);
                                  console.log("status", status);
                                  console.log(123, item);
                                  setShowEdit(true);
                                }}
                                fontSize="small"
                                style={{
                                  color: "gray",
                                }}
                              />
                            </IconButton>
                          ) : (
                            <IconButton aria-label="delete" size="large">
                              <EditIcon
                                onClick={() => {
                                  setValueOrder(item);
                                  setStatus(item.orderStatus);
                                  console.log("status", status);
                                  console.log(123, item);
                                  setShowEdit(true);
                                }}
                                fontSize="small"
                                style={{
                                  color: "blue",
                                }}
                              />
                            </IconButton>
                          )}
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

      {/* modal update category */}
      <Modal show={showEdit} onHide={handleCloseEdit} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST">
            <Row className="mb-3">
              <Col>
                <Form.Select
                  aria-label="brand"
                  name="brand"
                  as="select"
                  //defaultValue={}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option disabled selected hidden>
                    Đang Chờ Xử Lý
                  </option>

                  <option value="shipping">Đang vận chuyển</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              {status == "pending" ? (
                <Button
                  style={{
                    fontSize: "15px",
                    backgroundColor: "blue",
                  }}
                  variant="contained"
                  type="submit"
                  disabled={true}
                  onClick={handleChangeStatus}
                >
                  Cập nhật
                </Button>
              ) : (
                <Button
                  style={{
                    fontSize: "15px",
                    backgroundColor: "blue",
                  }}
                  variant="contained"
                  type="submit"
                  onClick={handleChangeStatus}
                >
                  Cập nhật
                </Button>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Notifycation notify={notify} setNotify={setNotify} />
      {/* End modal update product */}
    </>
  );
};
