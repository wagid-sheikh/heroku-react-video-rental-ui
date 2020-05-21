import React, { Component } from "react";
import { Link } from "react-router-dom";
class SideBar extends Component {
  render() {
    return (
      <ul>
        <li>
          <Link to="/admin/posts">Admin</Link>
        </li>
        <li>
          <Link to="/admin/users">User</Link>
        </li>
      </ul>
    );
  }
}

export default SideBar;
