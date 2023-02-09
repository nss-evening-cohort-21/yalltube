import { clientCredentials } from '../utils/client';
import { getSinglePlaylist } from './playlistData';
import { getSingleVideo } from './videoData';

const endpoint = clientCredentials.databaseURL;

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
const updateMergedObj = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists/${payload.firebaseKey}.json`, {
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

const viewPlaylistDetails = (playlistFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePlaylist(playlistFirebaseKey), getMergedObjectsByPlaylistId(playlistFirebaseKey)])
    .then(([playlistObject, mergedObjectsArray]) => {
      const videoKeys = mergedObjectsArray.map((item) => item.video_id);
      const videosArray = [];
      videoKeys.forEach((id) => getSingleVideo(id).then((videoObj) => {
        videosArray.push(videoObj);
      }));
      resolve({ ...playlistObject, videos: videosArray });
    }).catch((error) => reject(error));
});

export {
  getMergedObjectsByPlaylistId,
  createMergedObj,
  updateMergedObj,
  viewPlaylistDetails,
};
