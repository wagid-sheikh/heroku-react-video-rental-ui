import React from "react";
import SideBar from "./sidebar";
import { Route } from "react-router-dom";
import Posts from "./posts";
import Users from "./users";
const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar></SideBar>
      <Route path="/admin/posts" component={Posts}></Route>
      <Route path="/admin/users" component={Users}></Route>
    </div>
  );
};

export default Dashboard;
