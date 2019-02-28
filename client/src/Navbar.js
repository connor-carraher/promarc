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
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: "#FFFFFF" }}>
                My Stuff
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  {" "}
                  <NavLink href="/inbox/" style={{ color: "#000000" }}>
                    Inbox
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  {" "}
                  <NavLink href="/myposts/" style={{ color: "#000000" }}>
                    My Posts
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/createpost/" style={{ color: "#FFFFFF" }}>
                Create Post
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
