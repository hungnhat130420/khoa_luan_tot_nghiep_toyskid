import axiosClient from "../config/axiosClient";

const productAPI = {
  getallproduct() {
    const url = "/product/getallproduct";
    return axiosClient.get(url);
  },
  findproductbyid(data) {
    const url = "/product/findproductbyid";
    return axiosClient.post(url, { _id: data._id });
  },
  findproductbycategoryid(data) {
    const url = "/product/findproductbycategoryid";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
  deleteproduct(data, accessToken) {
    const url = "/product/deleteproduct/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
};

export default productAPI;
