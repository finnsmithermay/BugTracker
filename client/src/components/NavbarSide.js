import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import auth from "../reducers/auth";
import Spinner from "./layout/Spinner";

// NavbarSide

export const NavbarSide = ({
  auth: { isAuthenticated, user, loading },
  logout,
}) => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const top = (
    <div className="navbar">
      {/* <Link to="#" className="menu-bars">
        <FaIcons.FaBars onClick={showSidebar} />
      </Link> */}

      <ul>
        <Link to="/" className="menuButtonsLarge">
          <i className="fas fa-code"></i> Bug Tracker
        </Link>

        {/* {user.name} */}
        <li>Logged in as Test name here</li>
      </ul>
      <ul>
        <li className="navLinks">
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );

  const side = (
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items">
        <li className="navbar-toggle">
          <Link to="#" className="menu-bars"></Link>
        </li>

        <Link to="/edit-profile" className="menuButtons">
          <i className="fas fa-user-circle text-primaryDash"></i> Edit Profile
        </Link>
        <Link to="profiles" className="menuButtons">
          <i className="fas fa-user-circle text-primaryDash"></i> View Profile
        </Link>

        <Link to="add-experience" className="menuButtons">
          <i className="fab fa-black-tie text-primaryDash"></i> Add Experience
        </Link>

        <Link to="add-project" className="menuButtons">
          <i className="fab fa-black-tie text-primaryDash"></i> Create New
          Project
        </Link>
        <Link to="projects" className="menuButtons">
          <i className="fab fa-black-tie text-primaryDash"></i> Projects
        </Link>

        <li>
          <Link to="/profiles" className="menuButtons">
            Developers
          </Link>
        </li>

        <li>
          <Link to="/posts" className="menuButtons">
            Posts
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className="menuButtons">
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {top}

      {!loading && (isAuthenticated ? side : null)}
    </>
  );
};

NavbarSide.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavbarSide);
