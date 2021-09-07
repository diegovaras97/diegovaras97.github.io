import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./home";
import User from "./user";
import CitiesList from "./cities_list";
import UsersList from "./users_list";
import City from "./city";

const Webpages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UsersList} />
      <Route path="/cities" component={CitiesList} />
      <Route path="/user" component={User} />
      <Route path="/city" component={City} />
    </Router>
  );
};
export default Webpages;
