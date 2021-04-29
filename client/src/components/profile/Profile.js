import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { logout } from "../../actions/auth";

import {
  getProfileById,
  deleteAccount,
  getProfiles,
} from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile },
  auth,
  match,
  deleteAccount,
  logout,
}) => {
  useEffect(() => {
    getProfiles();
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      <div className="pageWrapperMarginForNav">
        <div className="pageWidth">
          {profile === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <div className="profile-grid my-1">
                <ProfileTop profile={profile} />
                <ProfileAbout profile={profile} />
                <div className="profile-exp bg-white p-2">
                  <h2 className="text-primary">Experience</h2>
                  {profile.experience.length > 0 ? (
                    <Fragment>
                      {profile.experience.map((experience) => (
                        <ProfileExperience
                          key={experience._id}
                          experience={experience}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No experience credentials</h4>
                  )}
                </div>

                <div className="profile-edu bg-white p-2">
                  <h2 className="text-primary">Education</h2>
                  {profile.education.length > 0 ? (
                    <Fragment>
                      {profile.education.map((education) => (
                        <ProfileEducation
                          key={education._id}
                          education={education}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No education credentials</h4>
                  )}
                </div>
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to="/add-experience" className="btn btn-dark">
                      Add Experience
                    </Link>
                  )}

                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to="/add-education" className="btn btn-dark">
                      Add Education
                    </Link>
                  )}

                {profile.githubusername && (
                  <ProfileGithub username={profile.githubusername} />
                )}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link to="/edit-profile" className="btn btn-dark">
                      Edit Profile
                    </Link>
                  )}
                {auth.isAuthenticated &&
                  auth.loading === false &&
                  auth.user._id === profile.user._id && (
                    <Link
                      to="/"
                      className="btn btn-danger"
                      onClick={(() => deleteAccount, logout)}
                    >
                      Delete My Account
                    </Link>
                  )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteAccount,
  logout,
  getProfileById,
})(Profile);
