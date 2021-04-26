import React, { useState, useEffect } from "react";
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
import { deleteAccount, getCurrentProfile } from "../actions/profile";

// NavbarSide

export const NavbarSide = ({
  auth: {
    isAuthenticated,
    deleteAccount,
    user,
    auth,
    loading,
    getCurrentProfile,
  },
  logout,
}) => {
  useEffect(() => {}, []);

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

        {/* {user.name === null || user === null || !isAuthenticated ? (
          <li></li>
        ) : (
          <li className="dashLoggedInAs">Logged in as {user.name}</li>
        )} */}
      </ul>
      <ul className="navLinks">
        <li>
          <a onClick={logout} href="#!" className="navLogout">
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

        <li>
          <Link to="/dashboard" className="menuButtons">
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li>

        <Link to="add-project" className="menuButtons">
          Create New Project
        </Link>

        <Link to="/projects" className="menuButtons">
          Projects
        </Link>

        <Link to="/edit-profile" className="menuButtons">
          Edit Profile
        </Link>

        {!loading &&
          (isAuthenticated ? (
            <Link to={`/profile/${user._id}`} className="menuButtons">
              View Profile
            </Link>
          ) : null)}

        <Link to="add-experience" className="menuButtons">
          Add Experience
        </Link>

        <button className="menuButtons" onClick={() => deleteAccount()}>
          Delete My Account
        </button>

        <li>
          <Link to="/posts" className="menuButtons">
            Community Posts
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
  deleteAccount: PropTypes.func.isRequired,

  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteAccount, logout })(NavbarSide);
