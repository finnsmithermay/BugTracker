import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addMember } from '../../actions/project';
import {connect} from 'react-redux'


const memberProjectItem = ({
    member: {
          
        name,
        status,
        skills,
        avatar,
        id
      },addMember,
      project:{project, _id}

      
    }) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt ='' className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status}</p>
              
                <button className="btn btn-primary" onClick={() => addMember(project._id,{name})
            
            }>
              Remove member
            </button>
            </div>
          
        </div>
    )

};


        

memberProjectItem.propTypes = {
profile:PropTypes.object.isRequired,
addMember: PropTypes.func.isRequired,
project:PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    project: state.project,
    auth: state.auth,




});


export default connect(mapStateToProps, {addMember}) (memberProjectItem)
