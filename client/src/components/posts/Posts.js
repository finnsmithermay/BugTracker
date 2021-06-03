import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
//import PostForm from './PostForm';
import { getPosts } from "../../actions/post";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {window.innerWidth > 900 ? (
        <div>
          <h1 className="largePostsTitle">Community Posts</h1>

          {/* <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p> */}

          <PostForm />

          <div className="posts">
            <div style={{ overflowY: "auto", height: "41rem" }}>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ==================  mobile view  ========================
        <div className="pageWidthMobile">
          <h1 className="largePostsTitleMobile">Community Posts</h1>

          {/* <p className="lead">
          <i className="fas fa-user" /> Welcome to the community
        </p> */}

          <PostForm />

          <div className="postsMobile">
            <div style={{ overflowY: "auto", height: "41rem" }}>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
