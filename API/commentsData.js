import { clientCredentials } from '../utils/client';
import { deleteVideo } from './videoData';

const endpoint = clientCredentials.databaseURL;

const getCommentsByVideoId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json?orderBy="video_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
//  Update Video
const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
const deleteVideoComments = (firebaseKey) => new Promise((resolve, reject) => {
  getCommentsByVideoId(firebaseKey).then((commentsArr) => {
    const deleteCommentsPromises = commentsArr.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentsPromises).then(() => {
      deleteVideo(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  getCommentsByVideoId,
  createComment,
  updateComment,
  deleteComment,
  deleteVideoComments,
};
