import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getPlayListVideos = (playlistFirebaseKey) => new Promise((resolve, reject) => {
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

// const viewPlaylistDetails = (playlistFirebaseKey) => new Promise((resolve, reject) => {
//   Promise.all([getSinglePlaylist(playlistFirebaseKey), getPlayListVideos(playlistFirebaseKey)])
//     .then(([authorObject, authorBooksArray]) => {
//       resolve({ ...authorObject, books: authorBooksArray });
//     }).catch((error) => reject(error));
// });

export {
  getPlayListVideos,
  createMergedObj,
  updateMergedObj,
  // viewPlaylistDetails,
};
