import React from 'react';
import {Link} from 'react-router-dom';

export const DashboardActions = () => {
    return (
      <div className="outer">

        <div className="dash-buttons">
        <Link to="/edit-profile" className="btnDash btn-light"
          ><i className="fas fa-user-circle text-primaryDash"></i> Edit Profile</Link>
        <Link to="add-experience" className="btnDash btn-light"
          ><i className="fab fa-black-tie text-primaryDash"></i> Add Experience</Link>
     
          <Link to="profiles" className="btnDash btn-light"
          ><i className="fas fa-user-circle text-primaryDash"></i> View Profile</Link>
          <Link to="add-project" className="btnDash btn-light"
          ><i className="fab fa-black-tie text-primaryDash"></i> Create New Project</Link>
            <Link to="projects" className="btnDash btn-light"
          ><i className="fab fa-black-tie text-primaryDash"></i> Projects</Link>
      </div>
      </div>


    )
}
export default DashboardActions;



