import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editProject, getProject } from "../../actions/project";
import { withRouter } from "react-router-dom";

const EditProject = ({
  profile: { profile, loading },

  editProject,
  getProject,
  project: { project, _id },
  history,
  match,
}) => {
  const [formData, setFormData] = useState({
    projectName: "",
    text: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getProject(_id);

    setFormData({
      projectName: loading || !project.projectName ? "" : project.projectName,
      text: loading || !project.text ? "" : project.text,
      startDate: loading || !project.startDate ? "" : project.startDate,
      endDate: loading || !project.endDate ? "" : project.endDate,
    });
  }, [loading]);

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { projectName, text, startDate, endDate } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="pageWrapperMarginForNav">
        <div className="pageWidth">
          <h1 class="large text-primary">Edit project</h1>
          <p class="lead">
            <i class="fas fa-code-branch"></i> Create a new project
          </p>
          <small>* = required field</small>

          <form
            class="form"
            onSubmit={(e) => {
              e.preventDefault();
              editProject(project._id, formData, history);
              history.push(`/project/${project._id}`);
            }}
          >
            <div class="form-group">
              <input
                type="text"
                placeholder="* Project Name"
                name="projectName"
                value={projectName}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            <div class="form-group">
              <h4>Start Date</h4>
              <input
                type="date"
                name="startDate"
                value={startDate}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class="form-group">
              <h4>Deadline</h4>
              <input
                type="date"
                name="endDate"
                value={endDate}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div class="form-group">
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Programm Description"
                value={text}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <input type="submit" class="btn btn-primary my-1" />
            <a class="btn btn-light my-1" href="/dashboard">
              Go Back
            </a>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProject, editProject })(
  withRouter(EditProject)
);
