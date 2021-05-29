import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import { Fragment } from "react";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <Fragment>
      {window.innerWidth > 1200 ? (
        <div class="post-form">
          <div class="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPost({ text });
              setText("");
            }}
          >
            <div className="inline">
              <textarea
                className="textAreaSize"
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post here"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              ></textarea>

              <input type="submit" className="btnSubmit" value="Submit" />
            </div>
          </form>
        </div>
      ) : (
        // ==================  mobile view  ========================

        <div class="post-formMobile">
          <div class="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPost({ text });
              setText("");
            }}
          >
            <div className="inlineMobile">
              <textarea
                className="textAreaSizeMobile"
                name="text"
                cols="20"
                rows="3"
                placeholder="Create a post"
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
              </div>
            </div>
          </form>
        </div>
      )}
    </Fragment>
  );
};

PostForm.propTypes = {};

export default connect(null, { addPost })(PostForm);
