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
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: []
    };
  }

  componentDidMount() {
    this.getCurrUser();
  }

  logout = () => {
    Cookies.remove("session");
    Cookies.remove("session.sig");
    window.location.reload();
  };

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ user: res.data.user }));
  };

  // { ? () : () }
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

                {this.state.user.isModerator ? (
                  <React.Fragment>
                    <hr />
                    <DropdownItem>
                      {" "}
                      <NavLink
                        tag={Link}
                        to="/moderatorview/"
                        style={{ color: "#000000" }}
                      >
                        Moderator View
                      </NavLink>
                    </DropdownItem>
                  </React.Fragment>
                ) : (
                  <React.Fragment />
                )}
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
