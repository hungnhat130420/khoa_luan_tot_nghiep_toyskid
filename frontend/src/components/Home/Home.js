import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <div>
        <Link to="/signin">Đăng nhập</Link>
        <a href="https://www.facebook.com/">Đăng xuất</a>
      </div>
    </div>
  );
}

export default Home;
