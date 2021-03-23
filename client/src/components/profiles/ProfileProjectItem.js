import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addMember } from '../../actions/project';
import {connect} from 'react-redux'


const ProfileProjectItem = ({
    profile: {  
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
      },addMember,
      project:{project}
    }) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt ='' className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1"> {location && <span>{location}</span>} </p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
                <button className="btn btn-primary" onClick={() => addMember(project._id,_id)}>
              Add
            </button>
            </div>
          
        </div>
    )
};


        

ProfileProjectItem.propTypes = {
profile:PropTypes.object.isRequired,
addMember: PropTypes.func.isRequired,
project:PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    project: state.project,
    auth: state.auth,




});


export default connect(mapStateToProps, {addMember}) (ProfileProjectItem)
