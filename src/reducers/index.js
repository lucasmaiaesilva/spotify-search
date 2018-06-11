import config from '../utils/config'
const initialState = {
  token: false,
  updateToken: () => window.location=`https://accounts.spotify.com/authorize?client_id=${config.client_id}&${config.options}&redirect_uri=${config.redirect_url}`
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}

export default app

