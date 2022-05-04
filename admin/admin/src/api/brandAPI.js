import axiosClient from "../config/axiosClient";

const brandAPI = {
  getallbrand() {
    const url = "/brand/getallbrand";
    return axiosClient.get(url);
  },
  findbrandbyname(data) {
    const url = "/brand/findbrandbyname";
    return axiosClient.post(url, { brandName: data.brandName });
  },
  findbrandbyid(data) {
    const url = "/brand/findbrandbyid";
    return axiosClient.post(url, { _id: data._id });
  },
  deletebrand(data, accessToken) {
    const url = "/brand/deletebrand/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
};

export default brandAPI;
