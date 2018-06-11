export function getData(url, token) {
  try {
    return fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      },
      method: 'GET'
    })
      .then(res => res.json())
  }
  catch(e) {
    // update token
    return window.location=`https://accounts.spotify.com/authorize?client_id=${config.client_id}&${config.options}&redirect_uri=${config.redirect_url}`
  }
}