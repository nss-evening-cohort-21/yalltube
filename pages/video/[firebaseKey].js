/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getSingleVideo, deleteVideo } from '../../API/videoData';
import { useAuth } from '../../utils/context/authContext';
import styles from '../../styles/ViewVideoPage.module.css';
import CommentCard from '../../components/CommentCard';
import { getCommentsByVideoId } from '../../API/commentsData';
import AddAComment from '../../components/forms/CommentForm';

export default function ViewVideo() {
  const [videoDetails, setVideoDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { user } = useAuth();

  const displayComments = () => {
    getCommentsByVideoId(firebaseKey).then(setComments);
  };

  const deleteThisVideo = () => {
    if (window.confirm(`Delete ${videoDetails.video_title}?`)) {
      deleteVideo(videoDetails.firebaseKey).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getSingleVideo(firebaseKey).then(setVideoDetails);
    displayComments();
  }, [firebaseKey]);

  return (
    <>
      <Head>
        <title>{videoDetails.video_title}</title>
      </Head>
      <div className={styles.videoPageContainer}>
        <div className={styles.videoContainer}>
          <iframe
            title={videoDetails.video_title}
            className={styles.responsiveIframe}
            src={videoDetails.video_url}
            allowFullScreen=""
          />
        </div>
        <div className={styles.videoPageDetails}>
          <h2>{videoDetails.video_title}</h2>
          <h6>Added by: {videoDetails.username} <br />
            {videoDetails.date_added}
          </h6>
          <p>{videoDetails.description}</p>
          <div>
            {videoDetails.uid === user.uid ? (
              <Button
                className={styles.blueBtn}
                href={`/video/edit/${videoDetails.firebaseKey}`}
              >
                Edit
              </Button>
            ) : ''}
            {videoDetails.uid === user.uid ? (
              <Button
                className={styles.redBtn}
                onClick={deleteThisVideo}
              >
                Delete
              </Button>
            ) : ''}
            {videoDetails.public === false ? (
              <h5 className={styles.viewPageIcon}>&#128274; Private</h5>
            ) : <h5 className={styles.viewPageIcon}>&#127758; Public</h5>}
          </div>
          <div>
            {/* <CommentForm></CommentForm> */}
            <div className="comment-cards-container">{comments.map((comment) => (
              <CommentCard key={comment.firebaseKey} commentObj={comment} onUpdate={displayComments} />
            ))}
            </div>
          </div>
        </div>
        {user
          && (
            <div className="comment-form">
              <AddAComment videoFbKey={firebaseKey} onUpdate={displayComments} />
            </div>
          )}
      </div>
    </>
  );
}
