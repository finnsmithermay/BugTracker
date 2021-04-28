import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { addMember } from "../../actions/project";
import { connect } from "react-redux";

const ProfileProjectItem = ({
  profile: {
    user: { name, avatar, _id },
    user,
    status,
    company,
    location,
    skills,
  },
  addMember,
  profile,
  project: { project },
}) => {
  return (
    <div className="profile bg-light">
      <div>
        <h2>{name}</h2>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>

        <button
          className="btn btn-primary"
          onClick={() => addMember(project._id, { profile })}
        >
          Add
        </button>
      </div>
    </div>
  );
};

ProfileProjectItem.propTypes = {
  profile: PropTypes.object.isRequired,
  addMember: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
  auth: state.auth,
});

export default connect(mapStateToProps, { addMember })(ProfileProjectItem);
