import React, { Component } from "react";
import PropTypes from "prop-types";
class Like extends Component {
  render() {
    const { onLike, objectLiked, liked } = this.props;
    let classes = liked ? "fa fa-heart" : "fa fa-heart-o";
    return (
      <React.Fragment>
        <i
          onClick={() => onLike(objectLiked)}
          style={{ cursor: "pointer" }}
          className={classes}
        ></i>
        {/* <a onClick={() => onLike(objectLiked)} href="#">
          <i className={classes}></i>
        </a> */}
      </React.Fragment>
    );
  }
}
Like.propTypes = {
  onLike: PropTypes.func.isRequired,
  objectLiked: PropTypes.object.isRequired,
  liked: PropTypes.bool.isRequired,
};
export default Like;
