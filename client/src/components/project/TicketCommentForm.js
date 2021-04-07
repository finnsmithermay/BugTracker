import React,{useState, useEffect}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {addComment} from '../../actions/project'
import {getProject,getTicket} from '../../actions/project';


const TicketCommentForm = ({projectId, ticketId,addComment}) => {

    useEffect(() => {
        getProject(projectId);
        getTicket(projectId, ticketId);
    
    }, []);

const [text, setText] = useState('');
    return (
        <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave a Comment</h3>
        </div>
        <form class="form my-1" onSubmit={e => {
            e.preventDefault();
            console.log("========================")
            console.log(projectId);
            console.log(ticketId);
            console.log({text});
            console.log("========================")

            addComment(projectId,ticketId, {text});
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

TicketCommentForm.propTypes = {
    addComment:PropTypes.func.isRequired,
}

export default connect(null, {addComment}) (TicketCommentForm)
