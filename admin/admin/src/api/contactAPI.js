import axiosClient from "../config/axiosClient";

const contactAPI = {
  getallcontact() {
    const url = "/contact/getallcontact";
    return axiosClient.get(url);
  },
};

export default contactAPI;
