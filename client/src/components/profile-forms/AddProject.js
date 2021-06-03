import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProject } from "../../actions/project";
import { withRouter } from "react-router-dom";

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    text: "",
    startDate: "",
    endDate: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { projectName, text, startDate, endDate } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {window.innerWidth > 900 ? (
        <div className="pageWrapperMarginForNav">
          <div className="pageWidth">
            <h1 class="large text-primary">Create project</h1>
            <p class="lead">
              <i class="fas fa-code-branch"></i> Create a new project
            </p>
            <small>* = required field</small>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                addProject(formData, history);
                history.push("/dashboard");
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
      ) : (
        // ==================  mobile view  ========================

        <div>
          <div className="pageWidthMobile">
            <h1 class="large text-primary">Create project</h1>
            <p class="lead">
              <i class="fas fa-code-branch"></i> Create a new project
            </p>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                addProject(formData, history);
                history.push("/dashboard");
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
      )}
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(withRouter(AddProject));
