import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';


const projectItem = ({auth, project: {_id, user, text, projectName, startDate, endDate},
 
}) => {
    return (
         <div className="post bg-white p-1 my-1">
          <div>

          <p>{projectName}</p>
        
           
           
          </div>
        </div>
    )
}



projectItem.propTypes = {
project: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps) (projectItem);
