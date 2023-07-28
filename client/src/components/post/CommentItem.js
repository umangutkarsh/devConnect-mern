import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';


const CommentItem = ({ post_id, comment: { _id, text, name, avatar, user, date }, auth, deleteComment }) => {
   return (
      <div className="post bg-white p-1 my-1">
         <div>
            <Link to={`/profile/${user}`}>
               <img
                  className="round-img"
                  src={avatar}
                  alt=""
               />
               <h4>{name}</h4>
            </Link>
         </div>
         <div>
            <p className="my-1">{text}</p>
            <p className="post-date">
               Posted on: {formatDate(date)}
            </p>
            {!auth.loading && user === auth.user._id && (
               <button 
                  className="btn btn-danger" 
                  type='button' 
                  onClick={() => deleteComment(post_id, _id)} 
               ><i className="fas fa-times" /> Delete Comment</button>
            )}
         </div>
      </div>
   );
};

CommentItem.propTypes = {
   deleteComment: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   post_id: PropTypes.string.isRequired,
   comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);