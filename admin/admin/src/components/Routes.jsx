import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import { Orders } from "../pages/Orders";
import { Brands } from "../pages/Brands";
import { Categories } from "../pages/Categories";
import { Contacts } from "../pages/Contacts";
import { Profile } from "../components/profile/Profile";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products} />
      <Route path="/orders" component={Orders} />
      <Route path="/brands" component={Brands} />
      <Route path="/categories" component={Categories} />
      <Route path="/profile" component={Profile} />
      <Route path="/contacts" component={Contacts} />
    </Switch>
  );
};

export default Routes;
