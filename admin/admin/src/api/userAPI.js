import axiosClient from "../config/axiosClient";

const userAPI = {
  finduserbyid(accessToken) {
    const url = "/user/finduserbyid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  getAllUser(accessToken) {
    const url = "/user/getalluser";
    return axiosClient.get(url, { header: { Authorization: accessToken } });
  },
};

export default userAPI;
