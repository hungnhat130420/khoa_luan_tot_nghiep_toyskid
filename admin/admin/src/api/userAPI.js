import axiosClient from "../config/axiosClient";

const userAPI = {
  finduserbyid(accessToken) {
    const url = "/user/finduserbyid";
    return axiosClient.post(url, { header: { Authorization: accessToken } });
  },
  getAllUser() {
    const url = "/user/getalluser";
    return axiosClient.post(url);
  },
  updateuserrole(data, accessToken) {
    const url = "/user/updateuserrole";
    return axiosClient.put(
      url,
      { userID: data.userID, role: data.role },
      { header: { Authorization: accessToken } }
    );
  },
  updateuser(data, accessToken) {
    const url = "/user/updateuser";
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
};

export default userAPI;
