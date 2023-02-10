import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import { deleteComment } from '../API/commentsData';

function CommentCard({ commentObj }) {
  // const deleteThisComment = () => {
  //   if (window.confirm('Delete your comment?')) {
  //     deleteComment(commentObj.firebaseKey).then(() => onUpdate());
  //   }
  // };
  // const { user } = useAuth();

  return (
    <>
      <Card className="comment-card">
        <div className="comment-container">
          <Card.Header>{commentObj.date_added}</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
                {' '}
                {commentObj.text}
                {' '}
              </p>
              <footer className="blockquote-footer">
                {commentObj.author}
              </footer>
            </blockquote>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    video_id: PropTypes.string,
    date_added: PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    author: PropTypes.string,
  }).isRequired,
};

export default CommentCard;
