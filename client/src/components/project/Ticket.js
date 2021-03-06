import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProject } from "../../actions/project";
import { Link } from "react-router-dom";
import TicketCommentForm from "./TicketCommentForm";
import { getCurrentProfile } from "../../actions/profile";
import TicketCommentItem from "./TicketCommentItem";
import {
  removeMember,
  getTickets,
  removeTicket,
  editTicket,
  getMembers,
  getTicket,
} from "../../actions/project";
import { getProfiles, getProjects } from "../../actions/profile";

var ticket = null;

const Ticket = ({
  auth,
  auth: { user },
  getProject,
  removeTicket,
  editTicket,
  getMembers,
  getTicket,
  getTickets,
  removeMember,
  loading,
  profile: { profiles },
  getProfiles,
  project: { project, ticket, tickets, members },
  match,
}) => {
  useEffect(() => {
    getProject(match.params.id);
    getTicket(project._id, match.params.id);
  }, [getTicket]);
  const [show, setShow] = useState(true);

  // const updateIndex = project.tickets
  //   .map((ticket) => ticket._id.toString())
  //   .indexOf(match.params.id);

  return members === null ||
    user === null ||
    project.projectName === null ||
    ticket == null ||
    ticket.name == null ? (
    <Spinner />
  ) : (
    <Fragment>
      {/* <p>{project.name}</p> */}
      {/* {ticket = project.tickets.find(ticket => ticket.id === "6066a67ffb221d58e6d750d6")} */}
      {window.innerWidth > 900 ? (
        <div className="pageWrapperMarginForNavTicket">
          <div className="rowC">
            {/* NOTE SHOW MEMBERS STARTS HERE */}

            <div className="projectWrapperTicket">
              <div className="ticketTitle">
                <p className="lead3">{ticket.ticketName}</p>
              </div>

              <div className="tickets2">
                <h3 className="">Ticket Author:</h3>
                <p className="">{ticket.name}</p>

                <h3 className="ticketdecription">Ticket Status:</h3>
                <p className="">{ticket.status}</p>

                <h3 className="ticketdecription">Ticket Priority:</h3>
                <p className="">{ticket.priority}</p>
                <p className=""></p>
                <h3 className="ticketdecription">Ticket Decription:</h3>
                <p className="">{ticket.text}</p>
              </div>
              <Link
                to={`/edit-ticket/${ticket._id}`}
                className="btn btn-light my-1 my-left"
              >
                Edit Task
              </Link>
              <Link
                to={`/project/${project._id}`}
                className="btn btn-light my-1"
              >
                Back to Project
              </Link>
            </div>

            <div className="marginTicket">
              <TicketCommentForm
                projectId={project._id}
                ticketId={ticket._id}
              />
              <div className="comments">
                <div style={{ overflowY: "auto", height: "41rem" }}>
                  {ticket.comments != null
                    ? ticket.comments.map((comment) => (
                        <TicketCommentItem
                          key={comment._id}
                          comment={comment}
                          ticketId={ticket._id}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ==================  mobile view  ========================

        <div className="pageWidthMobile">
          <div className="postsMobile">
            <div className="ticketTitle">
              <p className="lead3">{ticket.ticketName}</p>
            </div>

            <div className="tickets2">
              <h3 className="">Ticket Author:</h3>
              <p className="">{ticket.name}</p>

              <h3 className="ticketdecription">Ticket Status:</h3>
              <p className="">{ticket.status}</p>

              <h3 className="ticketdecription">Ticket Priority:</h3>
              <p className="">{ticket.priority}</p>
              <p className=""></p>
              <h3 className="ticketdecription">Ticket Decription:</h3>
              <p className="">{ticket.text}</p>
            </div>
            <Link
              to={`/edit-ticket/${ticket._id}`}
              className="btn btn-light my-1 my-left"
            >
              Edit Task
            </Link>
            <Link to={`/project/${project._id}`} className="btn btn-light my-1">
              Back to Project
            </Link>
          </div>
          <TicketCommentForm projectId={project._id} ticketId={ticket._id} />
          <div className="postsMobile">
            <div style={{ overflowY: "auto", height: "41rem" }}>
              {ticket.comments != null
                ? ticket.comments.map((comment) => (
                    <TicketCommentItem
                      key={comment._id}
                      comment={comment}
                      ticketId={ticket._id}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Ticket.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getTicket: PropTypes.func.isRequired,
  ticket: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
  ticket: state.project.ticket,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  editTicket,
  getTicket,
  getMembers,
  getTickets,
  removeTicket,
  removeMember,
  getProfiles,
  getProject,
})(Ticket);
