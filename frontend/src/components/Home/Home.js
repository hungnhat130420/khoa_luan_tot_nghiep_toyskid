import React from "react";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div>
      <div>
        <NavLink to="/index3">index3</NavLink>
      </div>
      <div>
        <NavLink to="/index4">index4</NavLink>
      </div>
      <div>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </div>
  );
}

export default Home;
