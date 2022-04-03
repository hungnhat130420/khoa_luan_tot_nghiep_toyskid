import axiosClient from "../config/axiosClient";

const productAPI = {
  GetAllProduct() {
    const url = "/product/getallproduct";
    return axiosClient.post(url);
  },
};

export default productAPI;
