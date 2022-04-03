import React, { useState } from "react";
import "../../../Styles/SignIn.scss";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../../app/userSlice";
const SignIn = () => {
  const dispatch = useDispatch();
  const History = useHistory();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const handleSignIn = async (e) => {
    e.preventDefault();
    const fetchSignUp = async () => {
      try {
        const action = signin({
          email: email,
          password: password,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        History.push("/home");
      } catch (error) {
        console.log(error);
      }
    };
    fetchSignUp();
  };

  return (
    <signin>
      <formlogo>
        <img
          className="logo"
          src={require("../../../images/TOYSKID.png")}
          alt=""
        />
        <p className="text">
          Mang niềm vui đến cho con trẻ Hạnh phúc cho trẻ – tuổi thơ hồn nhiên
          bên TOYSKID
        </p>
      </formlogo>
      <formsignin>
        <p className="text">Tài khoản:</p>
        <input
          type="text"
          placeholder="Nhập email/số điện thoại"
          className="inputsignin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text">Mật khẩu:</p>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          className="inputsignin"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleSignIn(e)}>
          Đăng nhập
        </button>
        <forgetpass>
          <a href="/">Quên mật khẩu?</a>
        </forgetpass>
        <liner></liner>
        <formsignup>
          <button type="submit">Đăng kí</button>
        </formsignup>
      </formsignin>
    </signin>
  );
};

export default SignIn;
