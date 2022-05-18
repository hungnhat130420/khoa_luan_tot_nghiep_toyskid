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
//import uploadAPI from "../api/uploadAPI";
import { useForm } from "react-hook-form";
import jsonCountry from "../assets/JsonData/CountryData.json";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export const Brands = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const [listBrand, setListBrand] = useState([]);
  const [country, setCountry] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [valueBrand, setValueBrand] = useState("");
  const handleDeleteClose = () => setShowDelete(false);
  const [search, setSearch] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [brandUpdateName, setBrandUpdateName] = useState("");
  const [brandUpdateNation, setBrandUpdateNation] = useState("");
  const [brandUpdateImage, setBrandUpdateImage] = useState("");

  const [brandName, setBrandName] = useState("");
  const [nation, setNation] = useState("Afghanistan");

  const [brandImage, setBrandImage] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setNation(value);
  };

  const handleAddBrand = async () => {
    //e.preventDefault();
    const addBrand = await brandAPI.addbrand(
      {
        brandName: brandName,
        nation: nation,
        image: "https://cf.shopee.vn/file/4e794ed10d435596f624978cc2eef103",
      },
      localStorage.getItem("accessToken_admin")
    );
    console.log("add product", addBrand);
    const imageRef = ref(storage, addBrand.result._id);
    uploadBytes(imageRef, brandImage)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            console.log("url", url);
            // console.log("productimage", productImage);
            const updateBrand = await brandAPI.updatebrand(
              {
                brandID: addBrand.result._id,
                image: url,
              },
              localStorage.getItem("accessToken_admin")
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    //window.location.reload(false);

    setShow(false);
    setNotify({
      isOpen: true,
      message: "Thêm thương hiệụ thành công",
      type: "success",
    });
  };

  const handleUpdateBrand = async () => {
    try {
      const imageRef = ref(storage, valueBrand._id);
      uploadBytes(imageRef, brandUpdateImage)
        .then(() => {
          getDownloadURL(imageRef)
            .then(async (url) => {
              console.log("url", url);
              //console.log("brand", productImage);
              const updateBrand = await brandAPI.updatebrand(
                {
                  brandID: valueBrand._id,
                  brandName: brandUpdateName,
                  nation: brandUpdateNation,
                  image: url,
                },
                localStorage.getItem("accessToken_admin")
              );
              console.log("update brand", updateBrand);
              setShowEdit(false);
              setNotify({
                isOpen: true,
                message: "Cập nhật thành công thành công",
                type: "success",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      //window.location.reload(false);
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

  useEffect(() => {
    const data = jsonCountry;
    setCountry(data);
  }, []);

  const handleExit = () => {
    window.location.reload(false);
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
                                setBrandUpdateName(item.brandName);
                                setBrandUpdateNation(item.nation);
                                setBrandUpdateImage(item.image);
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
          <Form onSubmit={handleSubmit(handleAddBrand)}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên thương hiệu"
                  type="text"
                  name="brandName"
                  {...register("brandName", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  onChange={(e) => setBrandName(e.target.value)}
                />
                {errors.brandName?.type === "required" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Vui lòng nhập tên loại
                  </p>
                )}
                {errors.brandName?.type === "minLength" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Có tối đa 6 kí tự
                  </p>
                )}
                {errors.brandName?.type === "maxLength" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Có tối đa 30 kí tự
                  </p>
                )}
              </Col>
              <Col>
                {/* <Select
                  options={options}
                  value={nation}
                  onChange={changeHandler}
                  placeholder="Quốc gia"
                  required
                  {...register("country", {
                    required: "chon quoc gia",
                  })}
                /> */}

                <select
                  name="country"
                  style={{ height: "40px", borderRadius: "4px" }}
                  onChange={(e) => setNation(e.target.value)}
                >
                  {/* <option disabled selected hidden>
                    Chọn quốc gia
                  </option> */}
                  <option value="Afghanistan">Afghanistan</option>
                  {country.map((item) => (
                    <option key={item.country} value={item.country}>
                      {item.country}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row className="mb-3 ml-3">
              <Col>
                <Col>
                  <Form.Control
                    required
                    type="file"
                    accept="image/*"
                    placeholder="pick image"
                    name="brandImage"
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
                //onClick={handleAddBrand}
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
          <form onSubmit={handleSubmit(handleUpdateBrand)}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên thương hiệu"
                  type="text"
                  name="brandName"
                  {...register("brandName", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  onChange={(e) => setBrandUpdateName(e.target.value)}
                  defaultValue={valueBrand.brandName}
                />
                {errors.brandName?.type === "required" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Vui lòng nhập tên loại
                  </p>
                )}
                {errors.brandName?.type === "minLength" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Có tối đa 6 kí tự
                  </p>
                )}
                {errors.brandName?.type === "maxLength" && (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      marginLeft: "2px",
                    }}
                  >
                    Có tối đa 30 kí tự
                  </p>
                )}
              </Col>
              <Col>
                {/* <Select
                  options={options}
                  value={nation}
                  onChange={changeHandler}
                  placeholder="Quốc gia"
                  required
                  {...register("country", {
                    required: "chon quoc gia",
                  })}
                /> */}

                <select
                  name="country"
                  style={{ height: "40px", borderRadius: "4px" }}
                  onChange={(e) => setBrandUpdateNation(e.target.value)}
                >
                  <option disabled selected hidden>
                    {valueBrand.nation}
                  </option>
                  {/* <option value="Afghanistan">Afghanistan</option>*/}
                  {country.map((item) => (
                    <option key={item.country} value={item.country}>
                      {item.country}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
            <Row className="mb-3 ml-3">
              <Col>
                <Col>
                  <Form.Control
                    required
                    type="file"
                    accept="image/*"
                    placeholder="pick image"
                    name="brandImage"
                    onChange={(e) => setBrandUpdateImage(e.target.files[0])}
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
                //onClick={handleAddBrand}
              >
                cập nhật thương hiệu
              </Button>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  );
};
