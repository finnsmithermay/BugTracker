import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";
import ProjectForm from "../project/ProjectForm";
import DashboardActions from "./DashboardActions";
import projectItem from "../project/projectItem";
import { getProjects } from "../../actions/project";
import { deleteProject } from "../../actions/project";
import Moment from "react-moment";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";
import MediaQuery from "react-responsive";

const Dashboard = ({
  deleteProject,
  auth,
  getCurrentProfile,
  deleteAccount,
  getProjects,
  auth: { user, isAuthenticated },
  profile: { profile, loading },
  project: { projects, name, avatar },
}) => {
  useEffect(() => {
    getProjects();

    getCurrentProfile();

    chart();
    barChart();
  }, []);

  const [chartData, setChartData] = useState({});

  const [barChartData, setBarChartData] = useState({});

  var low = 0;
  var medium = 0;
  var high = 0;
  var urgent = 0;
  var total = 0;
  var projectNames = [];
  var barData = [];

  const getVals = () => {
    projects.length === 0
      ? getProjects()
      : projects.map((project) =>
          project.user === user._id
            ? (barData.push(project.tickets.length),
              projectNames.push(project.projectName),
              project.tickets.map(
                (ticket) => (
                  (total = total + 1),
                  ticket.priority == "Low" ? (low = low + 1) : null,
                  ticket.priority == "Medium" ? (medium = medium + 1) : null,
                  ticket.priority == "High" ? (high = high + 1) : null,
                  ticket.priority == "Urgent" ? (urgent = urgent + 1) : null
                )
              ))
            : //else if the current user is a member add the project to the graphs
              project.members.map((member) =>
                member.id == user._id
                  ? project.user !== member.id
                    ? projectNames.push(project.projectName) &&
                      barData.push(project.tickets.length)
                    : null
                  : null
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

  const barChart = () => {
    setBarChartData({
      labels: projectNames,

      datasets: [
        {
          label: "label",
          data: barData,
          backgroundColor: ["#0a6ef0", "#0af021", "#fc8c03", "#fc0303"],
          borderWidth: 4,
        },
      ],
    });
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment className="pageWrapper">
      {window.innerWidth > 1200 ? (
        <div className="pageWrapperMarginForNav">
          {/* //chnage to just projects this user it part of */}

          <div className="dashHeading">
            <h1 className="largeDash text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fas fa-user" /> Welcome {user && user.name}
            </p>
          </div>

          {profile != null ? (
            <Fragment>
              <div className="graphs">
                <div className="graph">
                  {getVals()}
                  {total === 0 ? (
                    <h1>Looks Like you havent started any projects yet</h1>
                  ) : (
                    <Doughnut
                      data={chartData}
                      options={{
                        responsive: true,
                        title: { text: "Proportion Of Tickets", display: true },
                        scales: {
                          yAxes: [],
                        },
                      }}
                    />
                  )}
                </div>

                <div className="barGraph">
                  <Bar
                    data={barChartData}
                    options={{
                      title: { text: "Tickets Per Project", display: true },

                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                            },
                          },
                        ],
                        xAxes: [
                          {
                            barPercentage: 0.6,
                          },
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </div>
      ) : (
        //mobile view
        <div>
          <div className="dashHeading">
            <h1 className="largeDashMobile text-primary">Dashboard</h1>
            <p className="lead">
              <i className="fas fa-user" /> Signed in as {user && user.name}
            </p>
          </div>
          {getVals()}

          <div className="barGraphMobile">
            <Bar
              data={barChartData}
              options={{
                legend: {
                  display: false,
                },
                responsive: true,
                maintainAspectRatio: false,
                title: { text: "Tickets Per Project", display: true },

                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                  xAxes: [
                    {
                      barPercentage: 0.6,
                    },
                  ],
                },
              }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  project: state.project,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getProjects,
  deleteProject,
})(Dashboard);
