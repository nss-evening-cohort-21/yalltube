import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { deleteComment } from '../API/commentsData';
import { useAuth } from '../utils/context/authContext';
import { getSingleVideo } from '../API/videoData';

function CommentCard({ commentObj, onUpdate }) {
  const deleteThisComment = () => {
    if (window.confirm('Delete your comment?')) {
      deleteComment(commentObj.firebaseKey).then(() => onUpdate());
    }
  };
  const { user } = useAuth();
  const [video, setVideo] = useState({});

  useEffect(() => {
    getSingleVideo(commentObj.video_id).then(setVideo);
  }, [commentObj.video_id]);

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
                {commentObj.uid === user.uid || user.displayName === video.username

                  ? (
                    <Button
                      className="red-btn comment-btn"
                      onClick={deleteThisComment}
                    >
                      Delete
                    </Button>
                  ) : ''}
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
  onUpdate: PropTypes.func.isRequired,
};

export default CommentCard;
