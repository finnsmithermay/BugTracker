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
  profile: { profile },

  auth: {
    isAuthenticated,
    deleteAccount,
    auth,
    user,
    _id,
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
      <ul>
        <Link to="/" className="menuButtonsLarge">
          <i className="fas fa-code"></i> Bug Tracker
        </Link>
      </ul>
      {/* <ul>
        {user.name === null || user === null || !isAuthenticated ? (
          <li></li>
        ) : (
          <li className="dashLoggedInAs">Logged in as {user.name}</li>
        )}/profile/me
      </ul> */}

      <ul className="navLinks">
        <li>
          <a onClick={logout} href="/" className="navLogout">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );

  const topMobile = (
    <div>
      <div className="navbar">
        <ul>
          <Link to="/" className="menuButtonsLarge">
            <i className="fas fa-code"></i> Bug Tracker
          </Link>
        </ul>
        {/* <ul>
        {user.name === null || user === null || !isAuthenticated ? (
          <li></li>
        ) : (
          <li className="dashLoggedInAs">Logged in as {user.name}</li>
        )}/profile/me
      </ul> */}

        <ul className="navLinks">
          <li>
            <a onClick={logout} href="/" className="navLogout">
              <i className="fas fa-sign-out-alt" />{" "}
              <span className="hide-sm">Logout</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="navbarMobile">
        <ul className="navLinksMobile">
          <li>
            <Link to="/projects" className="navLogoutMobile">
              <i className="fas fa-clipboard-list" />{" "}
            </Link>
          </li>
        </ul>
        <ul className="navLinksMobile">
          <li>
            <Link to="add-project" className="navLogoutMobile">
              <i className="fas fa-plus" />{" "}
            </Link>
          </li>
        </ul>
        <ul className="navLinksMobile">
          <li>
            <Link to="/posts" className="navLogoutMobile">
              <i className="fas fa-comments" />{" "}
            </Link>
          </li>
        </ul>

        {user == null || user === null
          ? null
          : !loading &&
            (isAuthenticated ? (
              <Link to={`/profile/${user._id}`} className="navLogoutMobile">
                <i className="fas fa-user-alt" />{" "}
              </Link>
            ) : null)}
      </div>
    </div>
  );

  const side = (
    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
      <ul className="nav-menu-items">
        <li className="navbar-toggle">
          <Link to="#" className="menu-bars"></Link>
        </li>

        {/* <li>
          <Link to="/dashboard" className="menuButtons">
            <span className="hide-sm">Dashboard</span>
          </Link>
        </li> */}
        <Link to="/projects" className="menuButtons">
          Projects
        </Link>
        <Link to="add-project" className="menuButtons">
          Create New Project
        </Link>

        <li>
          <Link to="/posts" className="menuButtons">
            Community Posts
          </Link>
        </li>

        {user == null || user === null
          ? null
          : !loading &&
            (isAuthenticated ? (
              <Link to={`/profile/${user._id}`} className="menuButtons">
                View Profile
              </Link>
            ) : null)}
      </ul>
    </nav>
  );

  return (
    <>
      {console.log(window.innerWidth)}
      {window.innerWidth > 750 && !loading && isAuthenticated ? top : null}
      {window.innerWidth > 750 && !loading && isAuthenticated ? side : null}
      {window.innerWidth < 750 && !loading && isAuthenticated
        ? topMobile
        : null}

      {/* {top}

      {!loading && (isAuthenticated ? side : null)} */}
    </>
  );
};

NavbarSide.propTypes = {
  logout: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  logout,
})(NavbarSide);
