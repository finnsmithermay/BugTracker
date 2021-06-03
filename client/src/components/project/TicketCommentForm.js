import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/project";
import { getProject, getTicket } from "../../actions/project";
import { Fragment } from "react";

const TicketCommentForm = ({ projectId, ticketId, addComment }) => {
  useEffect(() => {
    getProject(projectId);
    getTicket(projectId, ticketId);
  }, []);

  const [text, setText] = useState("");
  return (
    <Fragment>
      {window.innerWidth > 900 ? (
        <div className="post-form">
          <div class="bg-primary p">
            <h3>Leave a Comment</h3>
          </div>
          <form
            class="form my-1"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(projectId, ticketId, { text });
              setText("");
            }}
          >
            <div className="inline">
              <textarea
                className="textAreaSize"
                name="text"
                cols="30"
                rows="5"
                placeholder="Leave a Comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </div>
          </form>
        </div>
      ) : (
        // ==================  mobile view  ========================

        <div class="post-formMobile">
          <div class="bg-primary p">
            <h3>Leave a Comment</h3>
          </div>
          <form
            class="form my-1"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(projectId, ticketId, { text });
              setText("");
            }}
          >
            <div className="inlineMobile">
              <textarea
                className="textAreaSizeMobile"
                name="text"
                cols="20"
                rows="5"
                placeholder="Leave a Comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>
              <div className="submitPostMobile">
                <input
                  type="submit"
                  className="btnSubmitMobile"
                  value="Submit"
                />
              </div>{" "}
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

TicketCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(TicketCommentForm);
