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
  findbrandbyid(data, accessToken) {
    const url = "/brand/findbrandbyid";
    console.log(14, data);
    console.log(15, accessToken);
    return axiosClient.post(
      url,
      { brandID: data.brandID },
      { header: { Authorization: accessToken } }
    );
  },
  deletebrand(data, accessToken) {
    const url = "/brand/deletebrand/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
  updatebrand(data, accessToken) {
    const url = "/brand/updatebrand/" + data._id;

    return axiosClient.put(
      url,
      { brandName: data.brandName, nation: data.nation },
      { header: { Authorization: accessToken } }
    );
  },
  addbrand(data, accessToken) {
    const url = "/brand/addbrand";
    console.log(data);
    return axiosClient.post(
      url,
      {
        brandName: data.brandName,
        nation: data.nation,
        image: data.image,
      },
      { header: { Authorization: accessToken } }
    );
  },
};

export default brandAPI;
