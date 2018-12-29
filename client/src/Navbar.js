import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from "axios";
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
  render() {
    return (
      <div>
        <ReactstrapNavbar color="light" light expand="md">
          <NavbarBrand href="/">Promarc</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/createpost/">Create Post</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/viewpost/">View Post</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/test">Logout</NavLink>
            </NavItem>
          </Nav>
        </ReactstrapNavbar>
      </div>
    );
  }
}

export default Navbar;
