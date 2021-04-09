import React, {Fragment, useEffect,useState} from 'react'
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
import{Line} from 'react-chartjs-2'
import{Doughnut} from 'react-chartjs-2'


const Dashboard = ({deleteProject,auth,getCurrentProfile,deleteAccount, getProjects,auth:{user},profile:{profile, loading}, project:{projects,name, avatar } }) => {
    useEffect(() => {
      
      getProjects();

        getCurrentProfile();
        
        getVals();
        chart();
    },[getCurrentProfile]);

    const [chartData, setChartData] = useState({})


    var low = 0; var medium = 0; var high = 0; var urgent = 0;
    var total = 0;
    console.log("=====================")

    console.log(projects.length)
    console.log("=====================")

    const getVals = () =>{
    
    projects.length === 0 ? getProjects() :

    projects.map((project) => (
      project.tickets.map((ticket) => (
         console.log(ticket.priority),
         total = total + 1,

         ticket.priority == "Low" ?  low = low + 1:null,
         ticket.priority == "Medium" ?  medium = medium + 1:null,
         ticket.priority == "High" ?  high = high + 1:null,
         ticket.priority == "Urgent" ?  urgent = urgent + 1:null

         
    
        )),
        console.log(total)

          
    ))
      }

    const chart = () => {
      getVals(),
      setChartData({
        labels: ['low', 'medium', 'high','urgent'],
        
        datasets:[
          {
            label:'label',
            data:[low,medium,high,urgent],
            backgroundColor:["#0a6ef0","#0af021","#fc8c03","#fc0303"],
            borderWidth:4
            
          }
        ]
      })

    }



    return loading && profile === null ? <Spinner/> : 
    <Fragment>





{/* //chnage to just projects this user it part of */}





        <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
        {profile != null ? <Fragment>
          <DashboardActions/>
          {/*<Experience experience={profile.experience}/>}
          {<Education education={profile.education}/>*/}



          <div className="graph">
            {getVals()}
            {total === 0 ? 
            
            <h1>Looks Like you havent started any projects yet</h1>
            
            :
            <Doughnut data={chartData} options={{
              responsive: true,
              title: {text: 'title', display:true},
              scales:{
                yAxes:[
  
                ]
              }
            }}/> 
            }
          
          </div>

          
        


        {projects.map((project) => (
       
       <h1></h1>
            
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
