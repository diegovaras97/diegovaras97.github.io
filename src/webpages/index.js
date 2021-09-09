import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./home";
import User from "./user";
import CitiesList from "./cities_list";
import UsersList from "./users_list";
import City from "./city";
import Header from "./header";
import Search from "./search_results";

const Webpages = () => {
  return (
    <div>
      <Router>
        <Header></Header>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={UsersList} />
        <Route path="/cities" component={CitiesList} />
        <Route path="/user" component={User} />
        <Route path="/city" component={City} />
        <Route path="/search_results" component={Search} />
      </Router>
    </div>
  );
};
export default Webpages;
