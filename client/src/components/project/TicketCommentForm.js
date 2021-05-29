import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/project";
import { getProject, getTicket } from "../../actions/project";

const TicketCommentForm = ({ projectId, ticketId, addComment }) => {
  useEffect(() => {
    getProject(projectId);
    getTicket(projectId, ticketId);
  }, []);

  const [text, setText] = useState("");
  return (
    <div className="textAreaSize">
      <div className="bg-primary p">
        <h3>Add a comment to this ticket</h3>
      </div>
      <form
        className="textAreaSizeTicket"
        onSubmit={(e) => {
          e.preventDefault();

          addComment(projectId, ticketId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Add comment here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-light my-1" value="Submit" />
      </form>
    </div>
  );
};

TicketCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(TicketCommentForm);
