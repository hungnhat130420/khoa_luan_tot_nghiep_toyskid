import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import productAPI from "../api/productAPI";
import categoryAPI from "../api/categoryAPI";
import brandAPI from "../api/brandAPI";
import Notifycation from "../components/alert/Notifycation";
import ReactPaginate from "react-paginate";
import "../components/css/product.css";
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import "../components/topnav/topnav1.css";
import { useForm } from "react-hook-form";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Products = () => {
  const accessToken = localStorage.getItem("accessToken_admin");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  localStorage.getItem("user_admin");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [valueProduct, setValueProduct] = useState("");
  const [valueBrand, setValueBrand] = useState("");
  const [valueCategory, setValueCategory] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseEdit = () => setShowEdit(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const [listProduct, setListProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [listBrand, setListBrand] = useState([]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  // const [productCategoryFirst, setProductCategoryFirst] = useState(
  //   categories[0]._id
  // );
  // const [productBrandFirst, setProductBrandFirst] = useState(listBrand[0]._id);

  const [productUpdateName, setProductUpdateName] = useState("");
  const [productUpdatePrice, setProductUpdatePrice] = useState();
  const [productUpdateQuantity, setProductUpdateQuantity] = useState();
  const [productUpdateCategory, setProductUpdateCategory] = useState("");
  const [productUpdateBrand, setProductUpdateBrand] = useState("");
  const [productUpdateBrandID, setProductUpdateBrandID] = useState("");
  const [productUpdateCategoryID, setProductUpdateCategoryID] = useState("");
  const [productUpdateImage, setProductUpdateImage] = useState("");
  const [productUpdateUpdateColor, setProductUpdateColor] = useState("");
  const [productUpdateDescription, setProductUpdateDescription] = useState("");

  const [search, setSearch] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleShow = async () => {
    try {
      const getAllCategory = await categoryAPI.getallcategory();
      const getAllBrand = await brandAPI.getallbrand();
      setListBrand(getAllBrand.result);
      setCategories(getAllCategory.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchGetAllCate = async () => {
      try {
        const getAllCategory = await categoryAPI.getallcategory();
        setCategories(getAllCategory.result);
        console.log("cate", getAllCategory.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllCate();
  }, []);

  useEffect(() => {
    const fetchGetAllBrand = async () => {
      try {
        const getAllBrand = await brandAPI.getallbrand();
        setListBrand(getAllBrand.result);
        console.log("brand", getAllBrand.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllBrand();
  }, []);

  const handleDelete = () => {
    console.log("click");
    handleDeleteClose();
  };

  // pagimation
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const productPerPage = 10;
  const pagesVisited = pageNumber * productPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listProduct.length / productPerPage);
  useEffect(() => {
    const fetchGetAllProduct = async () => {
      try {
        const getAllProduct = await productAPI.getallproduct();
        setListProduct(getAllProduct.result);
        setProducts(listProduct.slice(0, 200));
        setDisplayPerPage(
          products.slice(pagesVisited, pagesVisited + productPerPage)
        );
        //console.log("products", displayPerPage);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllProduct();
  }, [listProduct]);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    //console.log(pageNumber);
  };

  const handleAddProduct = async () => {
    const addProduct = await productAPI.addproduct(
      {
        productName: productName,
        price: productPrice,
        quantity: productQuantity,
        description: productDescription,
        image: "https://cf.shopee.vn/file/4e794ed10d435596f624978cc2eef103",
        brandID: productBrand,
        color: [],
        categoryID: productCategory,
      },
      localStorage.getItem("accessToken_admin")
    );
    console.log("add product", addProduct);
    const imageRef = ref(storage, addProduct.result._id);
    uploadBytes(imageRef, productImage)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) => {
            console.log("url", url);
            console.log("productimage", productImage);
            const updateProduct = await productAPI.updateproduct(
              {
                productID: addProduct.result._id,
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

    //console.log("brand", productBrand);
    setShow(false);
    setNotify({
      isOpen: true,
      message: "Thêm sản phẩm thành công",
      type: "success",
    });
  };
  const handleUpdateProduct = async () => {
    //e.preventDefault();
    try {
      if (valueProduct.image !== "") {
        const imageRef = ref(storage, valueProduct._id);

        uploadBytes(imageRef, productUpdateImage)
          .then(() => {
            getDownloadURL(imageRef)
              .then(async (url) => {
                console.log("url", url);

                await productAPI.updateproduct(
                  {
                    productID: valueProduct._id,
                    productName: productUpdateName,
                    price: productUpdatePrice,
                    quantity: productUpdateQuantity,
                    description: productUpdateDescription,
                    image: url,
                    brandID: productUpdateBrandID,
                    //brandID: valueBrand._id,

                    color: [],
                    categoryID: productUpdateCategoryID,
                  },
                  localStorage.getItem("accessToken_admin")
                );
                console.log("brandID", productUpdateBrandID);
                setShowEdit(false);
                setNotify({
                  isOpen: true,
                  message: "Cập nhật thành công ",
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
      } else if (valueProduct.image === "") {
        await productAPI.updateproduct(
          {
            productID: valueProduct._id,
            productName: productUpdateName,
            price: productUpdatePrice,
            quantity: productUpdateQuantity,
            description: productUpdateDescription,

            brandID: productUpdateBrandID,
            //brandID: valueBrand._id,

            color: [],
            categoryID: productUpdateCategoryID,
          },
          localStorage.getItem("accessToken_admin")
        );
        setShowEdit(false);
        setNotify({
          isOpen: true,
          message: "Cập nhật thành công ",
          type: "success",
        });
      }
      //window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
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
          onClick={() => {
            handleShow();
            setShow(true);
          }}
        >
          Thêm sản phẩm
        </Button>
        <div
          className="topnav1__search"
          style={{ float: "right", width: "300px" }}
        >
          <input
            type="text"
            placeholder="Nhập mã hoặc tên cần tìm..."
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
                    <th style={{ textAlign: "center" }}>Mã sản phẩm</th>
                    <th style={{ textAlign: "center" }}>Tên sản phẩm</th>
                    <th style={{ textAlign: "center" }}>Hình ảnh</th>
                    <th style={{ textAlign: "center" }}>Số lượng tồn</th>
                    <th style={{ textAlign: "center" }}>Giá</th>
                    <th style={{ textAlign: "center" }}>Tình trạng</th>
                    <th style={{ textAlign: "center" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.productName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        val._id.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td style={{ textAlign: "center" }}>{item._id}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.productName}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <img
                              src={item.image}
                              alt=""
                              style={{ width: "100px", height: "100px" }}
                            />
                          </td>

                          <td style={{ textAlign: "center" }}>
                            {item.quantity}
                          </td>
                          <td style={{ textAlign: "center" }}>{item.price}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.quantity > 0 ? "Còn hàng" : "Hết hàng"}{" "}
                          </td>

                          <td style={{ textAlign: "center", width: "120px" }}>
                            {" "}
                            <IconButton aria-label="delete" size="large">
                              <EditIcon
                                onClick={async () => {
                                  try {
                                    setValueProduct(item);
                                    setProductUpdateName(item.productName);
                                    setProductUpdatePrice(item.price);
                                    setProductUpdateQuantity(item.quantity);
                                    setProductUpdateDescription(
                                      item.description
                                    );
                                    setProductUpdateImage(item.image);
                                    setProductUpdateCategory(item.categoryID);
                                    setProductUpdateBrandID(item.brandID);
                                    setProductUpdateCategoryID(item.categoryID);
                                    const brandName =
                                      await brandAPI.findbrandbyid(
                                        {
                                          brandID: item.brandID,
                                        },
                                        localStorage.getItem(
                                          "accessToken_admin"
                                        )
                                      );
                                    setValueBrand(brandName.result);
                                    console.log("brandname", brandName);
                                    if (brandName.result !== null) {
                                      setProductUpdateBrand(
                                        brandName.result.brandName
                                      );
                                    }

                                    if (brandName.result === null) {
                                      setProductUpdateBrand(brandName.result);
                                    }

                                    console.log("brandName", valueBrand);
                                    const categoryName =
                                      await categoryAPI.findcategorybyid(
                                        {
                                          _id: item.categoryID,
                                        },
                                        localStorage.getItem(
                                          "accessToken_admin"
                                        )
                                      );

                                    setValueCategory(categoryName.result);
                                    if (categoryName.result !== null) {
                                      setProductUpdateCategory(
                                        categoryName.result.categoryName
                                      );
                                    }

                                    if (categoryName.result === null) {
                                      setProductUpdateCategory(
                                        categoryName.result
                                      );
                                    }
                                    handleShow();
                                    setShowEdit(true);
                                  } catch (err) {
                                    console.log(err);
                                  }
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
                                  console.log(valueProduct);
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

      {/* modal add product */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddProduct)}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên sản phẩm"
                  type="text"
                  name="productName"
                  {...register("productName", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {errors.productName?.type === "required" && (
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
                {errors.productName?.type === "minLength" && (
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
                {errors.productName?.type === "maxLength" && (
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
                <Form.Select
                  aria-label="category"
                  name="category"
                  required
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option disabled selected hidden></option>

                  {categories.map((item, i) => (
                    <option key={i} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Giá sản phẩm"
                  type="number"
                  required
                  name="price"
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </Col>

              <Col>
                <Form.Control
                  placeholder="Số lượng sản phẩm"
                  type="number"
                  name="quantity"
                  required
                  onChange={(e) => setProductQuantity(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control
                  required
                  type="file"
                  accept="image/*"
                  placeholder="pick image"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="brand"
                  name="brand"
                  required
                  onChange={(e) => setProductBrand(e.target.value)}
                >
                  <option disabled selected hidden></option>

                  {listBrand.map((item, i) => (
                    <option key={i} value={item._id}>
                      {item.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control
                  as="textarea"
                  placeholder="Mô tả sản phẩm"
                  style={{ height: "150px" }}
                  required
                  onChange={(e) => setProductDescription(e.target.value)}
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
                //onClick={handleAddProduct}
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
          <form onSubmit={handleSubmit(handleUpdateProduct)}>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Tên sản phẩm"
                  type="text"
                  name="productName"
                  {...register("productName", {
                    required: true,
                    minLength: 6,
                    maxLength: 30,
                  })}
                  defaultValue={productUpdateName}
                  onChange={(e) => setProductUpdateName(e.target.value)}
                />
                {errors.productName?.type === "required" && (
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
                {errors.productName?.type === "minLength" && (
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
                {errors.productName?.type === "maxLength" && (
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
                <Form.Select
                  aria-label="category"
                  name="category"
                  defaultValue={productUpdateCategory}
                  onChange={(e) => setProductUpdateCategoryID(e.target.value)}
                >
                  <option disabled selected hidden>
                    {valueCategory === null ? null : valueCategory.categoryName}
                  </option>
                  {categories.map((item, i) => (
                    <option key={i} value={item._id}>
                      {item.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Control
                  placeholder="Giá sản phẩm"
                  type="number"
                  required
                  name="price"
                  defaultValue={productUpdatePrice}
                  onChange={(e) => setProductUpdatePrice(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Số luợng"
                  type="number"
                  required
                  name="quantity"
                  defaultValue={productUpdateQuantity}
                  onChange={(e) => setProductUpdateQuantity(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control
                  required
                  type="file"
                  accept="image/*"
                  placeholder="pick image"
                  // required
                  //value={productUpdateImage}
                  onChange={(e) => setProductUpdateImage(e.target.files[0])}
                />
              </Col>
              <Col>
                <Form.Select
                  aria-label="brand"
                  name="brand"
                  as="select"
                  defaultValue={productUpdateBrand}
                  onChange={(e) => setProductUpdateBrandID(e.target.value)}
                >
                  <option disabled selected hidden>
                    {valueBrand === null ? null : valueBrand.brandName}
                  </option>
                  {listBrand.map((item, i) => (
                    <option key={i} value={item._id}>
                      {item.brandName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3 ml-3">
              <Col>
                <Form.Control
                  as="textarea"
                  placeholder="Mô tả sản phẩm"
                  required
                  style={{ height: "150px" }}
                  defaultValue={productUpdateDescription}
                  onChange={(e) => setProductUpdateDescription(e.target.value)}
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
                //onClick={handleUpdateProduct}
              >
                Cập nhật
              </Button>
            </Form.Group>
          </form>
        </Modal.Body>
      </Modal>
      <Notifycation notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Products;
