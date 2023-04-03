import React, { useState } from "react";
import { Link,  useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser, faSignOutAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav } from "react-bootstrap";
import './Header.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../../actions";

const Header = ({ user, setUser }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    fetch(`/api/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          setUser(null);
          dispatch(signOut());
          history.push("/");
        });
      }
    });
  };

  const toggleMenu = () => {
    console.log(showMenu);
    setShowMenu(!showMenu);
  };

  return (
    <Navbar className="navbar" bg="black" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Join The Band
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link onClick={toggleMenu} as={Link} to="/">
            Home
          </Nav.Link>
          {isLoggedIn ? 
            <>
          <Nav.Link onClick={toggleMenu} as={Link} to="/profiles">
            <FontAwesomeIcon icon={faUser} /> Profiles
          </Nav.Link>
          <Nav.Link onClick={toggleMenu} as={Link} to="/edit-profile">
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </Nav.Link>
            </> : 
            <>
            <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;