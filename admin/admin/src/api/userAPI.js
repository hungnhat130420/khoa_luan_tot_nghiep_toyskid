import axiosClient from "../config/axiosClient";

const userAPI = {
  finduserbyid(accessToken) {
    const url = "/user/finduserbyid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  getAllUser() {
    const url = "/user/getalluser";
    return axiosClient.get(url);
  },
};

export default userAPI;
