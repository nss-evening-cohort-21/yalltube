import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// Get User Videos
const getUserVideos = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos.json?orderBy="uid"&equalTo="${uid}"`, {
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
// Videos for Home View
const getHomeVideos = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const homeFilterVideos = Object.values(data).filter((item) => item.public === true || item.uid === uid);
      resolve(homeFilterVideos);
    })
    .catch(reject);
});
// Get Single Video
const getSingleVideo = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// Create Video Entry
const createVideo = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos.json`, {
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
const updateVideo = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos/${payload.firebaseKey}.json`, {
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
// Delete Video
const deleteVideo = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/videos/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
export {
  getUserVideos,
  getHomeVideos,
  getSingleVideo,
  createVideo,
  updateVideo,
  deleteVideo,
};
