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
import Moment from "react-moment";
import { Doughnut } from "react-chartjs-2";

import {
  removeMember,
  getTickets,
  removeTicket,
  editTicket,
  getMembers,
  getTicket,
} from "../../actions/project";
import ProjectMember from "./projectMembers";
import { getProfiles, getProjects } from "../../actions/profile";
import AddTicket from "../../components/project/AddTicket";
import ticketItem from "../../components/project/ticketItem";

var show = {
  teamMembers: false,
  addMembers: false,
};

var color = "red";
var completedColor = "blue";

const Project = ({
  auth,
  auth: { user },
  getProject,
  removeTicket,
  editTicket,
  getMembers,
  getTickets,
  removeMember,
  loading,
  profile: { profiles },
  getProfiles,
  project: { tickets, project, members },
  match,
}) => {
  const [show, setShow] = useState(true);

  const [showMembers, setShowMembers] = useState(true);

  const [showCurrentTickets, setshowCurrentTickets] = useState(true);

  // const [mobileProjectNav, setMobileProjectNav] = useState(true);
  const [mobileProjectNav, setMobileProjectNav] = useState("Tickets");

  const [search, setSearch] = useState("");
  const [searchMembers, setSearchMembers] = useState("");
  const [searchTickets, setsearchTickets] = useState("");

  var [seachFeild, setSeachFeild] = useState("");

  var filteredList = [];
  var filteredListMembers = [];
  var filteredTickets = [];

  useEffect(() => {
    getProject(match.params.id);
    getProfiles();
    getMembers();
    getTickets();
    chart();
  }, []);
  const filteredMembers = "";

  filteredList = profiles.filter((item) =>
    item.user.name
      .toString()
      .toLowerCase()
      .includes(search.toString().toLowerCase())
  );

  var low = 0;
  var medium = 0;
  var high = 0;
  var urgent = 0;
  var total = 0;

  const [chartData, setChartData] = useState({});

  const getVals = () => {
    project.tickets.map(
      (ticket) => (
        (total = total + 1),
        ticket.priority == "Low" ? (low = low + 1) : null,
        ticket.priority == "Medium" ? (medium = medium + 1) : null,
        ticket.priority == "High" ? (high = high + 1) : null,
        ticket.priority == "Urgent" ? (urgent = urgent + 1) : null
      )
    );
  };

  const chart = () => {
    setChartData({
      labels: ["low", "medium", "high", "urgent"],

      datasets: [
        {
          label: "label",
          data: [low, medium, high, urgent],
          backgroundColor: ["#0a6ef0", "#0af021", "#fc8c03", "#fc0303"],
          borderWidth: 4,
        },
      ],
    });
  };

  return members === null || user === null || project === null ? (
    <Spinner />
  ) : window.innerWidth > 1200 ? (
    <Fragment>
      {getVals()}
      <div className="pageWrapperMarginForNav">
        {project.projectName === null ? (
          <Spinner />
        ) : (
          <h1 className="large text-primary"></h1>
        )}

        <div className="outerProjectTitle">
          <h1 className="large text-primary">{project.projectName}</h1>

          <div className="dash-buttons">
            <button className="btnDash" onClick={() => setShowMembers(true)}>
              Tickets and Members
            </button>

            <button className="btnDash" onClick={() => setShowMembers(false)}>
              Project Outline
            </button>

            <Link to={`/edit-project/${project._id}`} className="btnDash">
              Edit Project
            </Link>
          </div>
        </div>

        {showMembers ? (
          <div className="rowC">
            {/* NOTE SHOW MEMBERS STARTS HERE */}

            <div className="projectWrapper">
              <div>{/* project description */}</div>

              <div className="divHeading">
                <p className="lead">View and edit project members</p>
              </div>

              <div>
                <button
                  className="btnDashTicketsMobile"
                  onClick={() => setShow(true)}
                >
                  View Members
                </button>

                <button
                  className="btnDashTicketsMobile"
                  onClick={() => setShow(false)}
                >
                  Add Members
                </button>
              </div>

              {/* {show ? (
                <div style={{ overflowY: "auto", height: "38rem" }}>
                  <div className="searchBar">
                    <input
                      className="searchBarInput"
                      type="text"
                      placeholder="Search Project Members"
                      name="text"
                      value={searchMembers}
                      onChange={(e) => setSearchMembers(e.target.value)}
                      required
                    />
                  </div>

                  {loading || project.members == null
                    ? ((<Spinner />), getMembers())
                    : ((filteredListMembers = project.members.filter((item) =>
                        item.name
                          .toString()
                          .toLowerCase()
                          .includes(searchMembers.toString().toLowerCase())
                      )),
                      filteredListMembers.map((member) => (
                        <div className="profile bg-light">
                          <div>
                            <p>{member.name}</p>
                            <Link
                              to={`/profile/${member.id}`}
                              className="btn btn-primary"
                            >
                              View Profile test
                            </Link>

                            {project.user === auth.user._id && (
                              <button
                                onClick={() =>
                                  removeMember(project._id, member.id)
                                }
                                type="button"
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      )))}
                </div>
              ) : null} */}

              {/* show all users */}
              {!show ? (
                <div style={{ overflowY: "auto", height: "38rem" }}>
                  <div className="searchBar">
                    <input
                      className="searchBarInput"
                      type="text"
                      placeholder="Search Member"
                      name="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      required
                    />
                  </div>

                  {profiles.length > 0 ? (
                    filteredList.map((profile) => (
                      <ProfileProjectItem key={profile._id} profile={profile} />
                    ))
                  ) : (
                    <h1> None found</h1>
                  )}
                </div>
              ) : null}
            </div>

            <div className="projectWrapperTickets">
              {/* <div className="dash-buttons my-a"> */}
              <p className="lead">Tickets</p>

              <div className="dash-buttons">
                <button
                  className="btnDashTickets"
                  onClick={() => setshowCurrentTickets(true)}
                >
                  Current Tasks
                </button>

                <button
                  className="btnDashTickets"
                  onClick={() => setshowCurrentTickets(false)}
                >
                  Finished Tasks
                </button>
              </div>

              {showCurrentTickets ? (
                <div>
                  <Link
                    to={`/add-ticket/${project._id}`}
                    className=" btnDashTickets my-2"
                  >
                    Add ticket
                  </Link>

                  {/* </div> */}
                  <div className="searchBar">
                    <input
                      className="searchBarInput"
                      type="text"
                      placeholder="Search Tasks"
                      name="text"
                      value={searchTickets}
                      onChange={(e) => setsearchTickets(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ overflowY: "auto", height: "33rem" }}>
                    {loading || tickets == null ? (
                      <Spinner />
                    ) : (
                      ((filteredTickets = project.tickets.filter((item) =>
                        item.ticketName != null
                          ? item.ticketName
                              .toString()
                              .toLowerCase()
                              .includes(
                                searchTickets.toString().toLowerCase()
                              ) ||
                            item.priority
                              .toString()
                              .toLowerCase()
                              .includes(searchTickets.toString().toLowerCase())
                          : null
                      )),
                      filteredTickets.map((ticket) =>
                        // tickets
                        ticket.status !== "Complete"
                          ? (ticket.priority === "Low"
                              ? (color = "#2cdd58")
                              : ticket.priority === "Medium"
                              ? (color = "orange")
                              : ticket.priority === "High"
                              ? (color = "orange")
                              : ticket.priority === "Urgent"
                              ? (color = "#f84040")
                              : (color = "white"),
                            (
                              // className="projectsHeading"
                              <div className="projectTcikets bg-white my-5">
                                <div
                                  style={{
                                    backgroundColor: color,
                                  }}
                                >
                                  <p className="mediumtext">
                                    {ticket.ticketName}
                                  </p>
                                </div>

                                {/* grid here */}
                                <div className="projectManager">
                                  {/* <Link to={`/profile/${project.user}`}> */}
                                  <p>Author: {ticket.name}</p>
                                  {/* </Link> */}
                                </div>
                                {/* dates */}
                                <div className="project-grid">
                                  <div className="project-edu">
                                    <p className="post-date">
                                      Created on{" "}
                                      <Moment format="YYYY/MM/DD">
                                        {ticket.date}
                                      </Moment>
                                    </p>
                                  </div>

                                  {/* members and tickets */}

                                  <div className="project-expTickets">
                                    <div className="projectsIcons">
                                      <p>Status: {ticket.status}</p>
                                      <p> Priority: {ticket.priority}</p>
                                    </div>
                                  </div>

                                  {/* buttons */}
                                  <div className="project-btn">
                                    {/* <div className="projectsButtonsLayout"> */}
                                    {/* <div className="dash-buttons"> */}

                                    <Link
                                      to={`/ticket/${ticket._id}`}
                                      className="btn btn-light"
                                    >
                                      View ticket
                                    </Link>
                                    {user._id === project.user && (
                                      <button
                                        onClick={() =>
                                          removeTicket(project._id, ticket._id)
                                        }
                                        className="btn btn-light"
                                      >
                                        Delete Ticket
                                      </button>
                                    )}
                                    {/* </div> */}
                                    {/* </div> */}
                                  </div>
                                </div>
                              </div>
                            ))
                          : null
                      ))
                    )}
                  </div>
                </div>
              ) : null}
              {/* // else show the competed tasks */}

              {!showCurrentTickets ? (
                <div>
                  {/* </div> */}
                  <div style={{ overflowY: "auto", height: "35rem" }}>
                    <div className="searchBar">
                      <input
                        className="searchBarInput"
                        type="text"
                        placeholder="Search Tasks"
                        name="text"
                        value={searchTickets}
                        onChange={(e) => setsearchTickets(e.target.value)}
                        required
                      />
                    </div>

                    {loading || tickets == null ? (
                      <Spinner />
                    ) : (
                      ((filteredTickets = project.tickets.filter(
                        (item) =>
                          item.ticketName
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase()) ||
                          item.priority
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase())
                      )),
                      filteredTickets.map(
                        (ticket) =>
                          // tickets
                          ticket.status === "Complete" ? (
                            <div className="projectTcikets bg-white my-5">
                              <div
                                style={{
                                  backgroundColor: completedColor,
                                }}
                              >
                                <p className="medium">{ticket.ticketName}</p>
                              </div>

                              {/* grid here */}
                              <div className="projectManager">
                                {/* <Link to={`/profile/${project.user}`}> */}
                                <p>Author: {ticket.name}</p>
                                {/* </Link> */}
                              </div>
                              {/* dates */}
                              <div className="project-grid">
                                <div className="project-edu">
                                  <p className="post-date">
                                    Created on{" "}
                                    <Moment format="YYYY/MM/DD">
                                      {ticket.date}
                                    </Moment>
                                  </p>
                                </div>

                                {/* members and tickets */}

                                <div className="project-expTickets">
                                  <div className="projectsIcons">
                                    <p>Status: {ticket.status}</p>
                                    <p> Priority: {ticket.priority}</p>
                                  </div>
                                </div>

                                {/* buttons */}
                                <div className="project-btn">
                                  {/* <div className="projectsButtonsLayout"> */}
                                  {/* <div className="dash-buttons"> */}

                                  <Link
                                    to={`/ticket/${ticket._id}`}
                                    className="btn btn-light"
                                  >
                                    View ticket
                                  </Link>
                                  {user._id === project.user && (
                                    <button
                                      onClick={() =>
                                        removeTicket(project._id, ticket._id)
                                      }
                                      className="btn btn-light"
                                    >
                                      Delete Ticket
                                    </button>
                                  )}
                                  {/* </div> */}
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                          ) : null

                        // className="projectsHeading"
                      ))
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          //show poject decription
          // className="projectDescription"
          <div className="projectDescription">
            <div>
              <h2 className="projectDescriptionText">{project.text}</h2>
            </div>
            {/* <div className="pie"> */}
            {getVals()}
          </div>
          // </div>
        )}
      </div>
    </Fragment>
  ) : (
    // ==================  mobile view  ========================
    // ==================  mobile view  ========================
    // ==================  mobile view  ========================
    // ==================  mobile view  ========================

    <Fragment>
      {getVals()}
      {/* <div className="pageWrapperMarginForNav"> */}
      {project.projectName === null ? (
        <Spinner />
      ) : (
        <h1 className="large text-primary"></h1>
      )}

      <div className="outerProjectTitle">
        <div className="ProjectnavbarMobile">
          <ul className="navLinksMobile">
            <li>
              <button
                className="navLogoutMobile"
                onClick={() => setMobileProjectNav("Members")}
              >
                <i className="fas fa-user-friends" />{" "}
              </button>
            </li>
          </ul>
          <ul className="navLinksMobile">
            <li>
              <button
                className="navLogoutMobile"
                onClick={() => {
                  setMobileProjectNav("Tickets");
                }}
              >
                <i className="fas fa-th-list" />{" "}
              </button>
            </li>
          </ul>
          <ul className="navLinksMobile">
            <li>
              <Link
                to={`/edit-project/${project._id}`}
                className="navLogoutMobile"
              >
                <i className="fas fa-edit" />{" "}
              </Link>
            </li>
          </ul>

          <ul className="navLinksMobile">
            <li>
              <button
                className="navLogoutMobile"
                onClick={() => {
                  setMobileProjectNav("Outline");
                }}
              >
                <i className="fas fa-book" />{" "}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="rowC">
        {/* NOTE SHOW MEMBERS STARTS HERE */}

        {mobileProjectNav == "Members" ? (
          <div className="projectWrapperMobile">
            <div>{/* project description */}</div>

            <div className="dash-buttons">
              <button
                className="btnDashTicketsMobile my-1"
                onClick={() => setShow(true)}
              >
                View Members
              </button>

              <button
                className="btnDashTicketsMobile my-1"
                onClick={() => setShow(false)}
              >
                Add Members
              </button>
            </div>

            {show ? (
              <div style={{ overflowY: "auto", height: "38rem" }}>
                <div className="searchBar">
                  <input
                    className="searchBarInput"
                    type="text"
                    placeholder="Search Project Members"
                    name="text"
                    value={searchMembers}
                    onChange={(e) => setSearchMembers(e.target.value)}
                    required
                  />
                </div>

                {loading || project.members === null
                  ? ((<Spinner />), getMembers())
                  : ((filteredListMembers = project.members.filter((item) =>
                      item.name
                        .toString()
                        .toLowerCase()
                        .includes(searchMembers.toString().toLowerCase())
                    )),
                    filteredListMembers.map((member) => (
                      <div className="profile bg-light">
                        <div>
                          <h2>{member.name}</h2>
                          <Link
                            to={`/profile/${member.id}`}
                            className="btn btn-primary"
                          >
                            View
                          </Link>

                          {project.user === auth.user._id && (
                            <button
                              onClick={() =>
                                removeMember(project._id, member.id)
                              }
                              type="button"
                              className="btn btn-danger"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    )))}
              </div>
            ) : null}

            {/* show all users */}
            {!show ? (
              <div style={{ overflowY: "auto", height: "38rem" }}>
                <div className="searchBar">
                  <input
                    className="searchBarInput"
                    type="text"
                    placeholder="Search Member"
                    name="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                  />
                </div>

                {profiles.length > 0 ? (
                  filteredList.map((profile) => (
                    <ProfileProjectItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h1> None found</h1>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {mobileProjectNav == "Tickets" ? (
          <div className="projectWrapperTicketsMobile">
            {/* <div className="dash-buttons my-a"> */}

            <div className="dash-buttons">
              <button
                className="btnDashTicketsMobile"
                onClick={() => setshowCurrentTickets(true)}
              >
                Current Tasks
              </button>

              <button
                className="btnDashTicketsMobile my-1"
                onClick={() => setshowCurrentTickets(false)}
              >
                Finished Tasks
              </button>
            </div>

            {/* //tickets show here */}

            {showCurrentTickets ? (
              <div>
                <Link
                  to={`/add-ticket/${project._id}`}
                  className="linkDashTicketsMobile "
                >
                  Add ticket
                </Link>

                {/* </div> */}
                <div className="searchBar">
                  <input
                    className="searchBarInput"
                    type="text"
                    placeholder="Search Tasks"
                    name="text"
                    value={searchTickets}
                    onChange={(e) => setsearchTickets(e.target.value)}
                    required
                  />
                </div>

                <div style={{ overflowY: "auto", height: "  20rem" }}>
                  {loading || tickets == null ? (
                    <Spinner />
                  ) : (
                    ((filteredTickets = project.tickets.filter((item) =>
                      item.ticketName != null
                        ? item.ticketName
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase()) ||
                          item.priority
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase())
                        : null
                    )),
                    filteredTickets.map((ticket) =>
                      // tickets
                      ticket.status !== "Complete"
                        ? (ticket.priority === "Low"
                            ? (color = "#2cdd58")
                            : ticket.priority === "Medium"
                            ? (color = "orange")
                            : ticket.priority === "High"
                            ? (color = "orange")
                            : ticket.priority === "Urgent"
                            ? (color = "#f84040")
                            : (color = "white"),
                          (
                            // className="projectsHeading"
                            <div className="projectTcikets bg-white my-5">
                              <div
                                style={{
                                  backgroundColor: color,
                                }}
                              >
                                <p className="mediumtextMobile">
                                  {ticket.ticketName}
                                </p>
                              </div>

                              {/* grid here */}
                              <div className="projectManager">
                                {/* <Link to={`/profile/${project.user}`}> */}
                                <p>Author: {ticket.name}</p>
                                {/* </Link> */}
                              </div>
                              {/* dates */}
                              <div>
                                <div className="project-edu"></div>

                                {/* members and tickets */}

                                <div className="profile">
                                  <p className="post-date">
                                    Created on{" "}
                                    <Moment format="YYYY/MM/DD">
                                      {ticket.date}
                                    </Moment>
                                  </p>
                                  <p>Status: {ticket.status}</p>
                                  <p> Priority: {ticket.priority}</p>
                                  <Link
                                    to={`/ticket/${ticket._id}`}
                                    className="btn btn-primary"
                                  >
                                    View Ticket
                                  </Link>

                                  {/* buttons */}
                                  {/* <div className="projectsButtonsLayout"> */}
                                  {/* <div className="dash-buttons"> */}

                                  {user._id === project.user && (
                                    <button
                                      onClick={() =>
                                        removeTicket(project._id, ticket._id)
                                      }
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  )}
                                  {/* </div> */}
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                          ))
                        : null
                    ))
                  )}
                </div>
              </div>
            ) : null}
            {/* // else show the competed tasks */}

            {!showCurrentTickets ? (
              <div>
                {/* </div> */}
                <div style={{ overflowY: "auto", height: "35rem" }}>
                  <div className="searchBar">
                    <input
                      className="searchBarInput"
                      type="text"
                      placeholder="Search Tasks"
                      name="text"
                      value={searchTickets}
                      onChange={(e) => setsearchTickets(e.target.value)}
                      required
                    />
                  </div>

                  {loading || tickets == null ? (
                    <Spinner />
                  ) : (
                    ((filteredTickets = project.tickets.filter((item) =>
                      item.ticketName != null
                        ? item.ticketName
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase()) ||
                          item.priority
                            .toString()
                            .toLowerCase()
                            .includes(searchTickets.toString().toLowerCase())
                        : null
                    )),
                    filteredTickets.map(
                      (ticket) =>
                        // tickets
                        ticket.status === "Complete" ? (
                          <div className="projectTcikets bg-white my-5">
                            <div
                              style={{
                                backgroundColor: completedColor,
                              }}
                            >
                              <p className="medium">{ticket.ticketName}</p>
                            </div>

                            {/* grid here */}
                            <div className="projectManager">
                              {/* <Link to={`/profile/${project.user}`}> */}
                              <p>Author: {ticket.name}</p>
                              {/* </Link> */}
                            </div>
                            {/* dates */}
                            <div className="project-grid">
                              <div className="project-edu">
                                <p className="post-date">
                                  Created on{" "}
                                  <Moment format="YYYY/MM/DD">
                                    {ticket.date}
                                  </Moment>
                                </p>
                              </div>

                              {/* members and tickets */}

                              <div className="project-expTickets">
                                <div className="projectsIcons">
                                  <p>Status: {ticket.status}</p>
                                  <p> Priority: {ticket.priority}</p>
                                </div>
                              </div>

                              {/* buttons */}
                              <div className="project-btn">
                                {/* <div className="projectsButtonsLayout"> */}
                                {/* <div className="dash-buttons"> */}

                                <Link
                                  to={`/ticket/${ticket._id}`}
                                  className="btn btn-light"
                                >
                                  View ticket
                                </Link>
                                {user._id === project.user && (
                                  <button
                                    onClick={() =>
                                      removeTicket(project._id, ticket._id)
                                    }
                                    className="btn btn-light"
                                  >
                                    Delete Ticket
                                  </button>
                                )}
                                {/* </div> */}
                                {/* </div> */}
                              </div>
                            </div>
                          </div>
                        ) : null

                      // className="projectsHeading"
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div>
          {mobileProjectNav == "Outline" ? (
            //show poject decription
            // className="projectDescription"
            <div className="projectDescription">
              <div>
                <p className="projectDescriptionText">{project.text}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  removeMember: PropTypes.func.isRequired,
  getMembers: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  removeTicket: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  getTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
  profile: state.profile,
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
})(Project);
