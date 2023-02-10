import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Playlists
const getPlaylists = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists.json?orderBy="uid"&equalTo="${uid}"`, {
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

// GET Single Playlist
const getSinglePlaylist = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// CREATE Playlist
const createPlaylist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists.json`, {
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

// EDIT/UPDATE Playlist
const updatePlaylist = (payload) => new Promise((resolve, reject) => {
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

// DELETE Playlist
const deletePlaylist = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

// Add Video To Playlist

const addToPlaylist = (payload, playlistFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists/${playlistFirebaseKey}/videos.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPlaylistVideos = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/playlists/${firebaseKey}/videos.json`, {
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

export {
  getPlaylists,
  getSinglePlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  addToPlaylist,
  getPlaylistVideos,
};
