import axiosClient from "../config/axiosClient";

const productAPI = {
  getallproduct() {
    const url = "/product/getallproduct";
    return axiosClient.get(url);
  },
  findproductbyid(data) {
    const url = "/product/findproductbyid";

    return axiosClient.post(url, { _id: data._id });
  },
  findproductbycategoryid(data) {
    const url = "/product/findproductbycategoryid";
    return axiosClient.post(url, { categoryID: data.categoryID });
  },
  deleteproduct(data, accessToken) {
    const url = "/product/deleteproduct/" + data._id;

    return axiosClient.delete(url, { header: { Authorization: accessToken } });
  },
  // updateproduct(data, accessToken) {
  //   const url = "/product/updateproduct/" + data._id;
  //   console.log("da vao ham nay");
  //   return axiosClient.put(
  //     url,
  //     {
  //       productName: data.productName,
  //       price: data.price,
  //       quantity: data.quantity,
  //       description: data.description,
  //       image: data.image,
  //       brandID: data.brandID,
  //       color: data.color,
  //       categoryID: data.categoryID,
  //     },
  //     { header: { Authorization: accessToken } }
  //   );
  // },

  updateproduct(data, accessToken) {
    const url = "/product/updateproduct/" + data._id;
    return axiosClient.put(url, data, {
      header: { Authorization: accessToken },
    });
  },
  addproduct(data, accessToken) {
    const url = "/product/addproduct";
    console.log(data);
    return axiosClient.post(
      url,
      {
        productName: data.productName,
        price: data.price,
        quantity: data.quantity,
        description: data.description,
        image: data.image,
        brandID: data.brandID,
        color: data.color,
        categoryID: data.categoryID,
      },
      { header: { Authorization: accessToken } }
    );
  },
};

export default productAPI;
