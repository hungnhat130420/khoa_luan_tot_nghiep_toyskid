import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import statusCards from "../assets/JsonData/status-card-data.json";
import Badge from "../components/badge/Badge";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import authAPI from "../api/authAPI";
import "../components/status-card/status-card.css";
import productAPI from "../api/productAPI";
import brandAPI from "../api/brandAPI";
import orderAPI from "../api/orderAPI";
import userAPI from "../api/userAPI";
const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  useEffect(() => {
    const fetchSignIn = async () => {
      try {
        const getAllUser = await authAPI.signinbyemail({
          email: "hungnguyen.130420@gmail.com",
          password: "123456",
        });

        localStorage.setItem("user_admin", JSON.stringify(getAllUser.user));
        localStorage.setItem(
          "accessToken_admin",
          JSON.stringify(getAllUser.accessToken)
        );
        localStorage.setItem(
          "refreshToken_admin",
          JSON.stringify(getAllUser.refreshToken)
        );
        //console.log(getAllUser);
        //setAllProduct(getAllProduct.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSignIn();
  }, []);
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchGetAllProduct = async () => {
      try {
        const getAllProduct = await productAPI.getallproduct();
        setProducts(getAllProduct.result);

        const getAllUser = await userAPI.getAllUser();
        setUsers(getAllUser.result);

        const getAllBrand = await brandAPI.getallbrand();
        setBrands(getAllBrand.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllProduct();
  }, []);

  useEffect(() => {
    const fetchGetAllOrder = async () => {
      try {
        const getAllOrder = await orderAPI.getallorder();
        setOrders(getAllOrder.result);

        //console.log("products", displayPerPage);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllOrder();
  }, []);

  useEffect(() => {
    const fetchGetAllUser = async () => {
      try {
        const getAllUser = await userAPI.getAllUser();
        setBrands(getAllUser.result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllUser();
  }, []);

  useEffect(() => {
    const fetchGetAllBrand = async () => {
      try {
        const getAllBrand = await brandAPI.getallbrand();
        setBrands(getAllBrand.result);

        //console.log("products", displayPerPage);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetAllBrand();
  }, []);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              <div className="status-card">
                <div className="status-card__icon">
                  <i className="bx bx-cart"></i>
                </div>
                <div className="status-card__info">
                  <h4>{users.length}</h4>
                  <span>Tổng số khách hàng </span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="status-card">
                <div className="status-card__icon">
                  <i className="bx bx-cart"></i>
                </div>
                <div className="status-card__info">
                  <h4>{products.length}</h4>
                  <span>Tổng số sản phẩm</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="status-card">
                <div className="status-card__icon">
                  <i className="bx bx-cart"></i>
                </div>
                <div className="status-card__info">
                  <h4>{orders.length}</h4>
                  <span>Tổng số đơn hàng</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="status-card">
                <div className="status-card__icon">
                  <i className="bx bx-cart"></i>
                </div>
                <div className="status-card__info">
                  <h4>{brands.length}</h4>
                  <span>Tổng số thương hiệu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
