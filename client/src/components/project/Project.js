import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProject } from '../../actions/project'
import PostItem from '../posts/PostItem'
import { Link } from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile';
import ProfileProjectItem from '../profiles/ProfileProjectItem'
import memberProjectItem from '../profiles/memberProjectItem'
import SearchBox from '../../components/SearchBox/searchbox'
import {removeMember,getTickets,removeTicket,editTicket, getMembers,getTicket} from '../../actions/project';
import ProjectMember from './projectMembers'
import {getProfiles,getProjects} from '../../actions/profile';
import AddTicket from '../../components/project/AddTicket'
import ticketItem from '../../components/project/ticketItem'


var show = {
    teamMembers: false,
    addMembers: false
  };




const Project = ({auth,auth:{user},getProject,removeTicket,editTicket,getMembers, getTickets,removeMember,loading,profile: {profiles},getProfiles,project:{project, tickets, members}, match}) => {


const [show, setShow] = useState(true)

const [showMembers, setShowMembers] = useState(true)


const [search, setSearch] = useState('');
var [seachFeild, setSeachFeild] = useState('');

    useEffect(() => {
        getProject(match.params.id);
        getProfiles();
        getMembers();
        getTickets();
  

    }, [getProject]);
const filteredMembers = ''
    

    return  members === null || user === null || project === null? <Spinner/> : <Fragment>

       {project.projectName === null? <Spinner/> : <h1 className="large text-primary"></h1>}
      
      

       <div className="outer">
       <h1 className="large text-primary">{project.projectName}</h1>

       <div className="dash-buttons">
            <button className="btnDash" onClick={() => setShowMembers(true)}>

               Tickets and Members
            </button>

            <button className="btnDash" onClick={() => setShowMembers(false)}>
              Description
            </button>
         </div>

         </div>

            {
            showMembers? 
          
           
            <div className="rowC">


            {/* NOTE SHOW MEMBERS STARTS HERE */}

          
           <div className="projectWrapper">


          <div>
            {/* project description */}
         

          </div>


        <p className="lead">
                <i className="fas fa-user" /> View and edit project members
            </p>

        <div className="my-2">
            <button className="btn btn-primary" onClick={() => setShow(true)}>

              <i className="fas fa-user-minus"></i>
              View Project Members
            </button>

            <button className="btn btn-primary" onClick={() => setShow(false)}>
              <i className="fas fa-user-minus"></i>
              Add Project Members
            </button>
          </div>
        

         
          {
           show?
        <div style={{overflowY : 'auto',height: '41rem'}}>       
        {loading || members === null ? <Spinner/> : project.members.map(member => (
        <div className="profile bg-light">





        <div>
            <h2>{member.name}</h2>
            <p>{member.status}</p>
            <Link to={`/profile/${member._id}`} className="btn btn-primary">
                View Profile
            </Link>
         {/* {!auth.loading && user === auth.user._id && ( */}
                <button onClick={() => removeMember(project._id, member.id)} type="button" className="btn btn-danger">
                    <i className="fas fa-times"></i>
                </button>
            {/* // )} */}
        </div>
      
        </div>
         ))}
        </div>
           : null
          } 
   
        {/* show all users */}
        {
           !show?
            <div style={{overflowY : 'auto',height: '41rem'}}>

              

                <div class="form-group">
                    <input type="text" placeholder="Serach Member" name="text" 
                    value={search} onChange={e => setSearch(e.target.value)}
                    required />
                    </div>
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                        <ProfileProjectItem key={profile._id} profile={profile} />
                        ))
                    ) : <h1> None found</h1>}
                    </div>
                : null
                }

           </div>
           

            
        
            <div className="projectWrapperTickets" >
            <p className="lead">
                <i className="fas fa-user" /> Tickets
            </p>
            <div className="my-2">

            <Link to={`/add-ticket/${project._id}`} className="btn btn-light"
          ><i className="fab fa-black-tie text-primary"></i> Add ticket</Link>
          </div>
          <div style={{overflowY : 'auto',height: '41rem'}}>       

          {loading || tickets === null ? <Spinner/> : project.tickets.map(ticket => (
                  

                  
             <div className="tickets bg-light">
                      <h2>Created by {ticket.name}</h2>
                      <h2>Name {ticket.ticketName}</h2>
                      <h2>Status: {ticket.status}</h2>
                      <h2>Priority: {ticket.priority}</h2>

                      <button className="btn btn-danger" onClick={() => removeTicket(project._id,ticket._id)
            
            }>
              Delete Ticket
            </button>

            <Link to={`/ticket/${ticket._id}`} className="btn btn-primary">
                    View ticket
            </Link>
                    
                
              </div>

            
          ))}
                        </div>

            </div>
            </div>

          
          //show poject decription 
            : <div className="projectDescription">
              
            <h1>{project.projectName} decription</h1>
            <h2 className="projectDescriptionText">{project.text}</h2>

              </div>}

            
     

        
    </Fragment>
}

Project.propTypes = {
getProject: PropTypes.func.isRequired,
project: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired,
getProfiles: PropTypes.func.isRequired,
removeMember:PropTypes.func.isRequired,
getMembers:PropTypes.func.isRequired,
getTickets: PropTypes.func.isRequired,
removeTicket: PropTypes.func.isRequired,
editTicket:PropTypes.func.isRequired,
getTicket: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    project: state.project,
    auth: state.auth,
    profile: state.profile




});

export default connect(mapStateToProps, {getCurrentProfile,editTicket,getTicket,getMembers,getTickets,removeTicket,removeMember,getProfiles,getProject}) (Project)
