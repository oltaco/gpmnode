/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`/api/trackSearch?q=${query}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);

}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function addTrackToPlaylist(data, cb) {
  return fetch('/api/playlist', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(checkStatus)
  .then(parseJSON)
  .then(cb);
}

function getPlaylist(data, cb) {
  return fetch('/api/playlist', {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
  }



const Client = { search , addTrackToPlaylist, getPlaylist };
export default Client;
