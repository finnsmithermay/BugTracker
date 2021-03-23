import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProject } from '../../actions/project'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile';
import ProfileProjectItem from '../profiles/ProfileProjectItem'

import {getProfiles} from '../../actions/profile';



const Project = ({auth,auth:{user},getProject, loading,profile: {profiles},getProfiles,project:{project}, match}) => {
    useEffect(() => {
        getProfiles();
        getProject(match.params.id);


    }, []);
    return loading || project.members === null  || user === null ? <Spinner/> : <Fragment>
       {/* <p>{project.name}</p> */}
       <div className="project bg-white p-1 my-1">

        <h4>{user._id}</h4>


        {/* <h4>{project.members.length}</h4> */}


     
        </div>
        <div className="project bg-white p-1 my-1">
        {project.members === null ? <Spinner/> : project.members.map(member => (
                
            <div>
               <h1>{member.name}</h1> 
            </div>
                
            ))}
        </div>
        <div className="project bg-white p-1 my-1">
        {project.members.map(member => (
                
            <div>
               <h1>{member.name}</h1> 
            </div>
                
            ))}
        </div>
        <div className="profiles"> 
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                        <ProfileProjectItem  key = {profile._id} profile={profile} />
                        ))
                    ) : <h1> None found</h1>}
                    </div>

        
    </Fragment>
}

Project.propTypes = {
getProject: PropTypes.func.isRequired,
project: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired,
getProfiles: PropTypes.func.isRequired,



}

const mapStateToProps = state => ({
    project: state.project,
    auth: state.auth,
    profile: state.profile




});

export default connect(mapStateToProps, {getCurrentProfile,getProfiles,getProject}) (Project)
