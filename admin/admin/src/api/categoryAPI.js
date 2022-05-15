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
    return axiosClient.post(url, { categoryID: data._id });
  },
  deletecategory(data, accessToken) {
    const url = "/category/deletecategory/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
  updatecategory(data, accessToken) {
    const url = "/category/updatecategory/" + data._id;

    return axiosClient.put(
      url,
      { categoryName: data.categoryName },
      { header: { Authorization: accessToken } }
    );
  },
  addcategory(data, accessToken) {
    const url = "/category/addcategory";
    console.log(data);
    return axiosClient.post(
      url,
      {
        categoryName: data.categoryName,
      },
      { header: { Authorization: accessToken } }
    );
  },
};

export default categoryAPI;
