import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { decription, company, title, location, current, to, from },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -
        {!to ? " Now " : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Possition: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Decription: </strong> {decription}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
