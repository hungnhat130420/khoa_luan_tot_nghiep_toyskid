import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useMemo } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import brandAPI from "../api/brandAPI";
import Select from "react-select";
import countryList from "react-select-country-list";
import Notifycation from "../components/alert/Notifycation";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../components/css/product.css";
import ReactPaginate from "react-paginate";
import SearchIcon from "@mui/icons-material/Search";
import "../components/topnav/topnav1.css";
import uploadAPI from "../api/uploadAPI";
export const Brands = () => {
  const history = useHistory();
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
  const [search, setSearch] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [brandName, setBrandName] = useState("");

  const [nation, setNation] = useState("");

  const [brandImage, setBrandImage] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setNation(value);
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", brandImage);
    const result = await uploadAPI.uploadimage(fd);
    const arr = [];
    arr.push(result);
    await brandAPI.addbrand(
      {
        brandName: brandName,
        nation: nation.label,
        image: result,
      },
      localStorage.getItem("accessToken_admin")
    );
    window.location.reload(false);
    //history.push("/brands");
    setShow(false);
    setNotify({
      isOpen: true,
      message: "Thêm thương hiệụ thành công",
      type: "success",
    });
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", brandImage);
    const result = await uploadAPI.uploadimage(fd);
    try {
      await brandAPI.updatebrand(
        {
          _id: valueBrand._id,
          brandName: brandName,
          nation: nation.label,
          image: result,
        },
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
  const [brands, setBrands] = useState([]);
  const brandPerPage = 10;
  const pagesVisited = pageNumber * brandPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listBrand.length / brandPerPage);

  useEffect(() => {
    const fetchGetAllBrand = async () => {
      try {
        const getAllBrand = await brandAPI.getallbrand();
        setListBrand(getAllBrand.result);
        setBrands(listBrand.slice(0, 200));
        setDisplayPerPage(
          brands.slice(pagesVisited, pagesVisited + brandPerPage)
        );
        console.log("listBrand", displayPerPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllBrand();
  }, [listBrand]);
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
        <div
          className="topnav1__search"
          style={{ float: "right", width: "400px" }}
        >
          <input
            type="text"
            placeholder="Nhập mã, tên hoặc thương hiệu cần tìm..."
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
                    <th>STT</th>
                    <th style={{ textAlign: "center" }}>Mã thương hiệu</th>
                    <th style={{ textAlign: "center" }}>Tên thương hiệu</th>
                    <th style={{ textAlign: "center" }}>Quốc gia</th>
                    <th style={{ textAlign: "center" }}>Logo</th>
                    <th style={{ textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.brandName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val._id.toLowerCase().includes(search.toLowerCase()) ||
                        val.nation.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td style={{ textAlign: "center" }}>{item._id}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.brandName}
                        </td>
                        <td style={{ textAlign: "center" }}>{item.nation}</td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <img
                            src={item.image}
                            alt=""
                            style={{ width: "150px", height: "100px" }}
                          />
                        </td>

                        <td style={{ textAlign: "center" }}>
                          {" "}
                          <IconButton aria-label="delete" size="large">
                            <EditIcon
                              onClick={() => {
                                setValueBrand(item);
                                setShowEdit(true);
                                console.log("item", item);
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

      {/* modal add brand */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> Thêm thương hiệu </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form method="POST">
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên thương hiệu"
                  type="text"
                  name="name"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </Col>
              <Col>
                <Select
                  options={options}
                  value={nation}
                  onChange={changeHandler}
                  placeholder="Quốc gia"
                />
              </Col>
            </Row>
            <Row className="mb-3 ml-3">
              <Col>
                <Col>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    placeholder="pick image"
                    onChange={(e) => setBrandImage(e.target.files[0])}
                  />
                </Col>
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
                onClick={handleAddBrand}
              >
                Thêm thương hiệu
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
          <Form method="POST">
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên thương hiệu"
                  type="text"
                  defaultValue={valueBrand.brandName}
                  name="name"
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </Col>
              <Col>
                <Select
                  options={options}
                  value={nation}
                  defaultValue={valueBrand.nation}
                  onChange={changeHandler}
                  placeholder="Quốc gia"
                />
              </Col>
            </Row>
            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="pick image"
                  onChange={(e) => setBrandImage(e.target.files[0])}
                />

                <Button
                  style={{
                    fontSize: "15px",
                    backgroundColor: "blue",
                    marginTop: "30px",
                  }}
                  variant="contained"
                  type="submit"
                  onClick={handleUpdateBrand}
                >
                  Cập nhật thương hiệu
                </Button>
              </Col>

              <Col>
                <img
                  src={valueBrand.image}
                  alt=""
                  style={{ width: "370px", height: "200px" }}
                />
              </Col>
            </Row>

            <Form.Group className="mb-3"></Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  );
};
