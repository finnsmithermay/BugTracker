import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link, Redirect } from "react-router-dom";
import { getProjects, getProject } from "../../actions/project";
import { deleteProject } from "../../actions/project";
import Moment from "react-moment";
import NavbarSide from "../NavbarSide";
const Projects = ({
  isAuthenticated,
  deleteProject,
  getProject,
  auth,
  getCurrentProfile,
  deleteAccount,
  getProjects,
  auth: { user },
  profile: { profile, loading },
  project: { projects, name, avatar },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getProjects();
  }, [getProjects, getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : window.innerWidth > 900 ? (
    <Fragment>
      {profile != null ? (
        <Fragment>
          {/* <div className="my-project"> */}
          {projects.map((project) =>
            project.user === user._id ? (
              // <div className="scroll">
              <div className="project bg-white  my-1">
                <div className="projectsHeading">
                  <p className="medium">{project.projectName}</p>
                </div>

                {/* grid here */}
                <div className="projectManagerDiv">
                  <Link
                    className="projectManager"
                    to={`/profile/${project.user}`}
                  >
                    <h4>Project Manager: {project.name}</h4>
                  </Link>
                </div>
                {/* dates */}
                <div className="project-grid">
                  <div className="project-edu">
                    <p className="post-date">
                      {" "}
                      {"   "} Created on{" "}
                      <Moment format="YYYY/MM/DD">{project.startDate}</Moment>
                    </p>

                    <p className="post-date">
                      {" "}
                      {"  "} Deadline{" "}
                      <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                    </p>
                  </div>

                  {/* members and tickets */}

                  <div className="project-exp">
                    <div className="projectsIcons">
                      <p>
                        {"  "}
                        {project.members.length} members
                      </p>
                      <p>
                        {"  "}
                        {project.tickets.length} tickets
                      </p>
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="project-btn">
                    {/* <div className="projectsButtonsLayout"> */}
                    {/* <div className="dash-buttons"> */}
                    <Link
                      to={`/project/${project._id}`}
                      className="btnDashProjects"
                    >
                      View Project
                    </Link>

                    {user._id === project.user && (
                      <button
                        onClick={(e) => deleteProject(project._id)}
                        className="btnDashProjects"
                      >
                        Delete Project
                      </button>
                    )}
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ) : (
              //</div>
              project.members.map((member) =>
                member.id == user._id || project.user === user._id ? (
                  //start projet here

                  <div className="project bg-white  my-3">
                    <div className="projectsHeading">
                      <p className="medium">{project.projectName}</p>
                    </div>

                    {/* grid here */}
                    <div className="projectManagerDiv">
                      <Link
                        className="projectManager"
                        to={`/profile/${project.user}`}
                      >
                        <h4>Project Manager: {project.name}</h4>
                      </Link>
                    </div>
                    {/* dates */}
                    <div className="project-grid">
                      <div className="project-edu">
                        <p className="post-date">
                          {" "}
                          {"   "} Created on{" "}
                          <Moment format="YYYY/MM/DD">
                            {project.startDate}
                          </Moment>
                        </p>

                        <p className="post-date">
                          {" "}
                          {"  "} Deadline{" "}
                          <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                        </p>
                      </div>

                      {/* members and tickets */}

                      <div className="project-exp">
                        <div className="projectsIcons">
                          <p>
                            {"  "}
                            {project.members.length} members
                          </p>
                          <p>
                            {"  "}
                            {project.tickets.length} tickets
                          </p>
                        </div>
                      </div>

                      {/* buttons */}
                      <div className="project-btn">
                        {/* <div className="projectsButtonsLayout"> */}
                        {/* <div className="dash-buttons"> */}
                        <Link
                          to={`/project/${project._id}`}
                          className="btnDashProjects"
                        >
                          View Project
                        </Link>

                        {user._id === project.user && (
                          <button
                            onClick={(e) => deleteProject(project._id)}
                            className="btnDashProjects"
                          >
                            Delete Project
                          </button>
                        )}
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                ) : //end projet here

                null
              )
            )
          )}
          {/* </div> */}
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  ) : (
    //================  MOBILE STARTING HERE ==================

    <Fragment>
      {profile != null ? (
        <Fragment>
          {/* <div className="my-project"> */}
          {projects.map((project) =>
            project.user === user._id ? (
              // <div className="scroll">
              <div className="project bg-white  my-1">
                <div className="projectsHeading">
                  <p className="medium">{project.projectName}</p>
                </div>

                {/* grid here */}
                <div className="projectManagerDiv">
                  <Link
                    className="projectManagerMobile"
                    to={`/profile/${project.user}`}
                  >
                    <h4>Project Manager: {project.name}</h4>
                  </Link>
                </div>
                {/* dates */}
                <div className="project-grid">
                  <div className="project-edu">
                    <p className="post-date">
                      {" "}
                      {"  "} Deadline{" "}
                      <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                    </p>
                  </div>

                  {/* members and tickets */}

                  <div className="project-exp">
                    <div className="projectsIcons">
                      <p>
                        {"  "}
                        tickets {project.tickets.length}
                      </p>
                    </div>
                  </div>

                  {/* buttons */}
                  <div className="project-btn">
                    {/* <div className="projectsButtonsLayout"> */}
                    {/* <div className="dash-buttons"> */}
                    <Link
                      to={`/project/${project._id}`}
                      className="btnDashProjectsMobile"
                    >
                      View
                    </Link>

                    {user._id === project.user && (
                      <button
                        onClick={(e) => deleteProject(project._id)}
                        className="btnDashProjectsMobile"
                      >
                        Delete
                      </button>
                    )}
                    {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            ) : (
              //</div>
              project.members.map((member) =>
                member.id == user._id || project.user === user._id ? (
                  //start projet here

                  <div className="project bg-white  my-3">
                    <div className="projectsHeading">
                      <p className="medium">{project.projectName}</p>
                    </div>

                    {/* grid here */}
                    <div className="projectManagerDivMobile">
                      <Link
                        className="projectManagerMobile"
                        to={`/profile/${project.user}`}
                      >
                        <p>Project Manager: {project.name}</p>
                      </Link>
                    </div>
                    {/* dates */}
                    <div className="project-grid">
                      <div className="project-edu">
                        <p className="post-date">
                          {" "}
                          {"  "} Deadline:{" "}
                          <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                        </p>
                      </div>

                      {/* members and tickets */}

                      <div className="project-exp">
                        <div className="projectsIcons">
                          <p>
                            Tasks: {project.tickets.length}
                            {"  "}
                          </p>
                        </div>
                      </div>

                      {/* buttons */}
                      <div className="project-btn">
                        {/* <div className="projectsButtonsLayout"> */}
                        {/* <div className="dash-buttons"> */}
                        <Link
                          to={`/project/${project._id}`}
                          className="btnDashProjectsMobile"
                        >
                          View
                        </Link>

                        {user._id === project.user && (
                          <button
                            onClick={(e) => deleteProject(project._id)}
                            className="btnDashProjectsMobile"
                          >
                            Delete
                          </button>
                        )}
                        {/* </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                ) : //end projet here

                null
              )
            )
          )}
          {/* </div> */}
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

Projects.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProject,
  deleteAccount,
  getProjects,
  deleteProject,
})(Projects);
