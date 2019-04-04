import React, { Component } from "react";
import Cookies from "js-cookie";
import {
  Navbar as ReactstrapNavbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

class Navbar extends Component {
  logout = () => {
    Cookies.remove("session");
    Cookies.remove("session.sig");
    window.location.reload();
  };
  render() {
    return (
      <div style={{ marginBottom: "55px" }}>
        <ReactstrapNavbar
          fixed="top"
          style={{ backgroundColor: "#069BEE" }}
          expand="md"
        >
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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "#FFFFFF" }}>
                My Stuff
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  {" "}
                  <NavLink
                    tag={Link}
                    to="/inbox/0"
                    style={{ color: "#000000" }}
                  >
                    Inbox
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  {" "}
                  <NavLink
                    tag={Link}
                    to="/myposts/"
                    style={{ color: "#000000" }}
                  >
                    My Posts
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink
                tag={Link}
                to="/createpost/"
                style={{ color: "#FFFFFF" }}
              >
                Create Post
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={Link}
                to="/logout"
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
