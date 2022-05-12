import axiosClient from "../config/axiosClient";
const orderAPI = {
  getallorder() {
    const url = "/order/getallorder";
    return axiosClient.get(url);
  },
  updateorderstatus(data, accessToken) {
    const url = "/order/updateorderstatus/" + data._id;
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
};
export default orderAPI;
