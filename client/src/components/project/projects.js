import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import { getProjects, getProject } from "../../actions/project";
import { deleteProject } from "../../actions/project";
import Moment from "react-moment";
import NavbarSide from "../NavbarSide";

const Projects = ({
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
  ) : (
    <Fragment>
      <div className="outer">
        {/* <h1 className="large text-primary">Projects</h1> */}
      </div>
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
                <div className="projectManager">
                  <Link to={`/profile/${project.user}`}>
                    <h4>Project Manager: {project.name}</h4>
                  </Link>
                </div>
                {/* dates */}
                <div className="project-grid">
                  <div className="project-edu">
                    <p className="post-date">
                      {" "}
                      <i className="fas fa-calendar-alt text-primaryDash"></i>
                      {"   "} Created on{" "}
                      <Moment format="YYYY/MM/DD">{project.startDate}</Moment>
                    </p>

                    <p className="post-date">
                      {" "}
                      <i className="fas fa-calendar-alt text-primaryDash"></i>
                      {"  "} Deadline{" "}
                      <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                    </p>
                  </div>

                  {/* members and tickets */}

                  <div className="project-exp">
                    <div className="projectsIcons">
                      <p>
                        <i className="fas fa-user-circle text-primaryDash"></i>
                        {"  "}
                        {project.members.length} members
                      </p>
                      <p>
                        <i className="fas fa-user-circle text-primaryDash"></i>
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
                    <div className="projectManager">
                      <Link to={`/profile/${project.user}`}>
                        <h4>Project Manager: {project.name}</h4>
                      </Link>
                    </div>
                    {/* dates */}
                    <div className="project-grid">
                      <div className="project-edu">
                        <p className="post-date">
                          {" "}
                          <i className="fas fa-calendar-alt text-primaryDash"></i>
                          {"   "} Created on{" "}
                          <Moment format="YYYY/MM/DD">
                            {project.startDate}
                          </Moment>
                        </p>

                        <p className="post-date">
                          {" "}
                          <i className="fas fa-calendar-alt text-primaryDash"></i>
                          {"  "} Deadline{" "}
                          <Moment format="YYYY/MM/DD">{project.endDate}</Moment>
                        </p>
                      </div>

                      {/* members and tickets */}

                      <div className="project-exp">
                        <div className="projectsIcons">
                          <p>
                            <i className="fas fa-user-circle text-primaryDash"></i>
                            {"  "}
                            {project.members.length} members
                          </p>
                          <p>
                            <i className="fas fa-user-circle text-primaryDash"></i>
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
  );
};

Projects.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getProject,
  deleteAccount,
  getProjects,
  deleteProject,
})(Projects);
