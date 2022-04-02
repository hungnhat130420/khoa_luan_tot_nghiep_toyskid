import axiosClient from "../config/axiosClient";

const signInAPI = {
  signIn(data) {
    const url = "/auth/signinbyemail";
    return axiosClient.post(url, { email: data.email, password: data.password });
  },
};

export default signInAPI;
