import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {deleteAccount, getCurrentProfile} from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import ProjectForm from '../project/ProjectForm'
import DashboardActions from './DashboardActions';
import projectItem from '../project/projectItem'
import { getProjects } from '../../actions/project';
import { deleteProject } from '../../actions/project';
import Moment from 'react-moment';


const Dashboard = ({deleteProject,auth,getCurrentProfile,deleteAccount, getProjects,auth:{user},profile:{profile, loading}, project:{projects,name, avatar } }) => {
    useEffect(() => {
        getCurrentProfile();
        getProjects();
    },[getProjects, getCurrentProfile]);

    return loading && profile === null ? <Spinner/> : 
    <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
        Position {user && user.status}
      </p>
        {profile != null ? <Fragment>
          <DashboardActions/>
          {/*<Experience experience={profile.experience}/>}
          {<Education education={profile.education}/>*/}

      
        {projects.map((project) => (
         //project Item part 
         //<div className="posts">
            <div className="project bg-white p-1 my-1">
               <div>
            <Link to={`/profile/${project.user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>Project Manager:     {project.name}</h4>
            </Link>

            <p className="post-date">
                Created on <Moment format='YYYY/MM/DD'>{project.startDate}</Moment>
            </p>

            <p className="post-date">
                Deadline <Moment format='YYYY/MM/DD'>{project.endDate}</Moment>
            </p>



          </div>
            <h4>{project.projectName}</h4>  
            {/* <span className='comment-count'>{project.members.length}</span> */}

            <h4>{project.members.length} members </h4>  
            <h4>{project.tickets.length} tickets</h4>  

            <div className="my-2">
            <Link to={`/project/${project._id}`} className="btn btn-primary">
                    View Project
            </Link>
            </div>
            
            {user._id === project.user &&(
              <div className="my-2">
            <button className="btn btn-danger" onClick={e => deleteProject(project._id)}>
              Delete Project
            </button>

          </div>
          )}
            </div>
            
     ))}
<div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>

          </div>



        </Fragment> : 
        
        <Fragment>
        <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>    
        </Fragment>}

    </Fragment>;
}

Dashboard.propTypes = {
getCurrentProfile: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired,
deleteAccount: PropTypes.func.isRequired,
deleteProject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    project: state.project

});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount,getProjects,deleteProject}) (Dashboard);
