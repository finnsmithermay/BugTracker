import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProject } from "../../actions/project";
import {
  removeMember,
  getMembers,
  getTickets,
  editTicket,
  getTicket,
} from "../../actions/project";
import { getProfiles, getProjects } from "../../actions/profile";
import Ticket from "./Ticket";
import Spinner from "../layout/Spinner";

const EditTicket = ({
  profile: { profile, loading },
  editTicket,
  history,
  getTicket,
  project: { project, ticket },
  ticket_id,
  match,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    getTicket(project._id, match.params.id);

    setFormData({
      name: loading || !ticket.name ? "" : ticket.name,
      text: loading || !ticket.text ? "" : ticket.text,
      priority: loading || !ticket.priority ? "" : ticket.priority,
      status: loading || !ticket.status ? "" : ticket.status,
    });
  }, [loading, getTicket]);

  const { name, text, status, priority } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {window.innerWidth > 900 ? (
        <div className="pageWrapperMarginForNav">
          <div className="pageWidth">
            <h1 className="large text-primary">Edit ticket</h1>
            <h1>{ticket.name}</h1>

            <small>* = required field</small>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                editTicket(project._id, ticket._id, formData, history);
              }}
            >
              {/* <div class="form-group">
              <input
                type="text"
                placeholder="Ticket name Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div> */}

              <div className="form-group">
                <p>Change Task status or mark it as complete</p>

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
                  <option value="Implemented">Implemented</option>
                  <option value="Complete">Mark as Complete</option>
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
                Back to project
              </a>
              {/* <Link to={`/project/${project._id}`} className="btn btn-light"
    ><i className="fab fa-black-tie text-primary"></i> Back to Project</Link> */}
            </form>
          </div>
        </div>
      ) : (
        // ==================  mobile view  ========================
        <div className="pageWidthMobile">
          <div className="postsMobile">
            <h1 className="large text-primary">Edit ticket</h1>
            <h1>{ticket.name}</h1>

            <small>* = required field</small>

            <form
              class="form"
              onSubmit={(e) => {
                e.preventDefault();
                editTicket(project._id, ticket._id, formData, history);
              }}
            >
              {/* <div class="form-group">
        <input
          type="text"
          placeholder="Ticket name Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
      </div> */}

              <div className="form-group">
                <p>Change Task status or mark it as complete</p>

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
                  <option value="Implemented">Implemented</option>
                  <option value="Complete">Mark as Complete</option>
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
                Back to project
              </a>
              {/* <Link to={`/project/${project._id}`} className="btn btn-light"
><i className="fab fa-black-tie text-primary"></i> Back to Project</Link> */}
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

EditTicket.propTypes = {
  editTicket: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  ticket: PropTypes.object.isRequired,
  getTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
  ticket: state.ticket,
});

export default connect(mapStateToProps, { editTicket, getTicket })(EditTicket);
