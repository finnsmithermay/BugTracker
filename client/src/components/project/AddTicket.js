import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import { getProject } from "../../actions/project";
import {
  removeMember,
  getMembers,
  getTickets,
  addTicket,
} from "../../actions/project";
import { getProfiles, getProjects } from "../../actions/profile";

const AddTicket = ({ addTicket, history, project: { project } }) => {
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    priority: "",
    status: "",
  });

  const { name, text, status, priority } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {window.innerWidth > 1200 ? (
        <div className="pageWrapperMarginForNav">
          <div className="pageWidth">
            <h1 class="large text-primary">Create ticket</h1>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                addTicket(project._id, formData, history);
                history.push(`/project/${project._id}`);
              }}
            >
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ticket name Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                >
                  <option value="0">* Select Ticket Status</option>
                  <option value="Not Started">Not started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Facing Issues">Facing Issues</option>
                  <option value="Testing">Testing</option>
                  <option value="Finished">Finished</option>
                  <option value="Implemented">Implemented</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  name="priority"
                  value={priority}
                  onChange={(e) => onChange(e)}
                >
                  <option value="0">* Select Ticket Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div class="form-group">
                <textarea
                  name="text"
                  cols="30"
                  rows="5"
                  placeholder="Ticket Description"
                  value={text}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>

              <input type="submit" class="btn btn-primary my-1" />
              <a class="btn btn-light my-1" href={`/project/${project._id}`}>
                Go Back
              </a>
            </form>
          </div>
        </div>
      ) : (
        // ==================  mobile view  ========================
        <div className="projectWrapperMobile">
          <div>
            <h1 class="large text-primary">Create ticket</h1>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                addTicket(project._id, formData, history);
                history.push(`/project/${project._id}`);
              }}
            >
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ticket name Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="status"
                  value={status}
                  onChange={(e) => onChange(e)}
                >
                  <option value="0">* Select Ticket Status</option>
                  <option value="Not Started">Not started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Facing Issues">Facing Issues</option>
                  <option value="Testing">Testing</option>
                  <option value="Finished">Finished</option>
                  <option value="Implemented">Implemented</option>
                </select>
              </div>

              <div className="form-group">
                <select
                  name="priority"
                  value={priority}
                  onChange={(e) => onChange(e)}
                >
                  <option value="0">* Select Ticket Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div class="form-group">
                <textarea
                  name="text"
                  cols="30"
                  rows="5"
                  placeholder="Ticket Description"
                  value={text}
                  onChange={(e) => onChange(e)}
                ></textarea>
              </div>

              <input type="submit" class="btn btn-primary my-1" />
              <a class="btn btn-light my-1" href={`/project/${project._id}`}>
                Go Back
              </a>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

AddTicket.propTypes = {
  addTicket: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { addTicket })(AddTicket);
