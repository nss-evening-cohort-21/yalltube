import { clientCredentials } from '../utils/client';
import { deletePlaylist } from './playlistData';

const endpoint = clientCredentials.databaseURL;
// Get All Merged Data Objects by the Playlist ID
const getMergedObjectsByPlaylistId = (playlistFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json?orderBy="playlist_id"&equalTo="${playlistFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});
// Get SIngle Merged Object By PlaylistID and VideoID
const getSingleMergedObj = (playlistFirebaseKey, videoFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json?orderBy="playlist_id"&equalTo="${playlistFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const arr = Object.values(data).filter((item) => item.video_id === videoFirebaseKey);
      resolve(arr[0]);
    })
    .catch(reject);
});
// Create Merged Object
const createMergedObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged.json`, {
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
// Patch Merged Object
const updateMergedObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged/${payload.firebaseKey}.json`, {
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
// Delete Single Merged Object
const deleteMergedObj = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/merged/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
// Delete All Playlist Data
const deletePlaylistData = (firebaseKey) => new Promise((resolve, reject) => {
  getMergedObjectsByPlaylistId(firebaseKey).then((arr) => {
    const deleteMergedDataPromises = arr.map((obj) => deleteMergedObj(obj.firebaseKey));

    Promise.all(deleteMergedDataPromises).then(() => {
      deletePlaylist(firebaseKey).then(resolve);
    });
  })
    .catch(reject);
});

export {
  getMergedObjectsByPlaylistId,
  createMergedObj,
  updateMergedObj,
  deleteMergedObj,
  deletePlaylistData,
  getSingleMergedObj,
};
