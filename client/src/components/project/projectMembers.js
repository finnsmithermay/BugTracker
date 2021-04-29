import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProject } from "../../actions/project";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import ProfileProjectItem from "../profiles/ProfileProjectItem";
import memberProjectItem from "../profiles/memberProjectItem";
import SearchBox from "../../components/SearchBox/searchbox";
import { removeMember, getMembers } from "../../actions/project";

import { getProfiles, getProjects } from "../../actions/profile";

var show = {
  teamMembers: false,
  addMembers: false,
};

const ProjectMember = ({
  auth,
  auth: { user },
  getProject,
  getMembers,
  removeMember,
  loading,
  profile: { profiles },
  getProfiles,
  project: { project, members },
  match,
}) => {
  const [show, setShow] = useState(true);

  const [search, setSearch] = useState("");
  var [seachFeild, setSeachFeild] = useState("");

  useEffect(() => {
    getProject(match.params.id);
    getProfiles();
    getMembers();
  }, []);
  const filteredMembers = "";

  return members === null || user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <p>{project.name}</p> */}
      <h1 className="large text-primary">{project.projectName}</h1>
      <p className="lead">View and edit project members</p>

      <div className="center">
        <div className="my-2">
          <button className="btn btn-primary" onClick={() => setShow(true)}>
            <i className="fas fa-user-minus"></i>
            View Project Members
          </button>

          <button className="btn btn-primary" onClick={() => setShow(false)}>
            <i className="fas fa-user-minus"></i>
            Add Project Members
          </button>
        </div>
      </div>

      {show ? (
        //<div className="py-4">

        <div
          style={{ overflowY: "auto", height: "41rem", paddingRight: "10px" }}
        >
          {/* seach shit here */}

          {/* ends here */}

          {loading || members === null ? (
            <Spinner />
          ) : (
            project.members.map((member) => (
              <div className="profile bg-light">
                <img src={member.avatar} alt="" className="round-img" />
                <div>
                  <h2>{member.name}</h2>
                  <p>{member.status}</p>
                  <Link
                    to={`/profile/${member._id}`}
                    className="btn btn-primary"
                  >
                    View Profile
                  </Link>

                  {/* {!auth.loading && user === auth.user._id && ( */}
                  <button
                    onClick={() => removeMember(project._id, member.id)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                  {/* // )} */}
                </div>
              </div>
            ))
          )}
        </div>
      ) : //</div>
      null}

      {!show ? (
        <div style={{ overflowY: "auto", height: "41rem" }}>
          <div class="form-group">
            <input
              type="text"
              placeholder="Serach Member"
              name="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
          </div>

          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileProjectItem key={profile._id} profile={profile} />
            ))
          ) : (
            <h1> None found</h1>
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

ProjectMember.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getMembers,
  removeMember,
  getProfiles,
  getProject,
})(ProjectMember);
