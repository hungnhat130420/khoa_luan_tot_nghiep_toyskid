import axiosClient from "../config/axiosClient";

const categoryAPI = {
  getallcategory() {
    const url = "/category/getallcategory";
    return axiosClient.get(url);
  },
  findcategorybyname(data) {
    const url = "/category/findcategorybyname";
    return axiosClient.post(url, { categoryName: data.categoryName });
  },
  findcategorybyid(data) {
    const url = "/category/findcategorybyid";
    return axiosClient.post(url, { _id: data._id });
  },
  deletecategory(data, accessToken) {
    const url = "/category/deletecategory/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
};

export default categoryAPI;
