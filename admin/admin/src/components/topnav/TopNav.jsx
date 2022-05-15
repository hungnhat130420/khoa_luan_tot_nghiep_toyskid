import React from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import notifications from "../../assets/JsonData/notification.json";

import user_image from "../../assets/images/logo.png";

import user_menu from "../../assets/JsonData/user_menus.json";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import Product from "../../pages/Products";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to={item.route} key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <button style={{ backgroundColor: "#ffffff" }}>{item.content}</button>
    </div>
  </Link>
);

const handleSearch = (e) => {
  console.log(e.target.value);
};

const Topnav = () => {
  const user = JSON.parse(localStorage.getItem("user_admin"));
  const curr_user = {
    display_name: user.userName,
    image: user.avatar,
  };

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input
          type="text"
          placeholder="Nhập thông tin cần tìm..."
          onChange={handleSearch}
        />

        <i>
          <IconButton aria-label="delete" size="large">
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div> */}
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
