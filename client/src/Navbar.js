import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Collapse,
  Navbar as ReactstrapNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Navbar extends Component {
  logout = () => {
    Cookies.remove("session");
    Cookies.remove("session.sig");
  };
  render() {
    return (
      <div>
        <ReactstrapNavbar style={{ backgroundColor: "#069BEE" }} expand="md">
          <NavbarBrand
            href="/"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "3px",
              paddingLeft: "15px",
              paddingRight: "15px"
            }}
          >
            Promarc
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/createpost/" style={{ color: "#FFFFFF" }}>
                Create Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/viewpost/" style={{ color: "#FFFFFF" }}>
                View Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/"
                style={{ color: "#FFFFFF" }}
                onClick={() => this.logout()}
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </ReactstrapNavbar>
      </div>
    );
  }
}

export default Navbar;
