import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./home";
import User from "./user";

const Webpages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/user" component={User} />
    </Router>
  );
};
export default Webpages;
