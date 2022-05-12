import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Row, Col, Form, Table } from "react-bootstrap";
import contactAPI from "../api/contactAPI";
import Notifycation from "../components/alert/Notifycation";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import "../components/css/product.css";
import ReactPaginate from "react-paginate";
import SearchIcon from "@mui/icons-material/Search";
import "../components/topnav/topnav1.css";
export const Contacts = () => {
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

  const [listContact, setListContact] = useState([]);

  // pagimation
  const [pageNumber, setPageNumber] = useState(0);
  const [contacts, setContacts] = useState([]);
  const contactPerPage = 10;
  const pagesVisited = pageNumber * contactPerPage;
  const [displayPerPage, setDisplayPerPage] = useState([]);
  const pageCount = Math.ceil(listContact.length / contactPerPage);

  useEffect(() => {
    const fetchGetAllContact = async () => {
      try {
        const getAllContact = await contactAPI.getallcontact();

        console.log(getAllContact.result);
        setListContact(getAllContact.result);
        setContacts(listContact.slice(0, 200));
        setDisplayPerPage(
          contacts.slice(pagesVisited, pagesVisited + contactPerPage)
        );

        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetAllContact();
  }, [listContact]);
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
    //console.log(pageNumber);
  };

  return (
    <>
      <h2 className="page-header">Quản lý liên hệ</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Mã liên hệ </th>
                    <th style={{ textAlign: "center" }}>Tên người gửi</th>
                    <th style={{ textAlign: "center" }}>Email</th>
                    <th style={{ textAlign: "center" }}>Nội dung</th>
                    <th style={{ textAlign: "center" }}>Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {displayPerPage
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val._id.toLowerCase().includes(search.toLowerCase()) ||
                        val.name.toLowerCase().includes(search.toLowerCase()) ||
                        val.email.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((item, i) => (
                      <tr key={i}>
                        <td style={{ textAlign: "center" }}>{item._id}</td>
                        <td style={{ textAlign: "center" }}>{item.name}</td>

                        <td style={{ textAlign: "center" }}>{item.email}</td>
                        <td style={{ textAlign: "center" }}>{item.content}</td>
                        <td style={{ textAlign: "center" }}>
                          {item.timeSend.split(" ")[0]}
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
    </>
  );
};
