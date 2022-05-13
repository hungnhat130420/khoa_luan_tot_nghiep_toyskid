import axiosClient from "../config/axiosClient";

const uploadImage = {
  uploadimage(fd) {
    const url = "/uploads3/uploadimage";
    return axiosClient.post(url, fd);
  },
};

export default uploadImage;
