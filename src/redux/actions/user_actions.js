import { positiveFeedback, negativeFeedback, loadingStart, loadingEnd } from './app_actions';

export const LOG_USER = 'LOG_USER';
export const LOGOUT = 'LOGOUT';
export const REGISTER_TOKEN = 'REGISTER_TOKEN';

export const loginUser = (userData) => (dispatch) => {
  dispatch(loadingStart());
  
  axios.post('http://localhost:3333/login', userData)
    .then( response => dispatch(registerToken(response.data)) )
    .catch( err => {
      console.log('error en axios post ');
      dispatch(negativeFeedback('no tengo ese user'))
    })
    .then( () => dispatch(loadingEnd()));
}

export const registerToken = (token) => {
  return {
    type: REGISTER_TOKEN,
    token
  }
}

export const userVerify = (token) => (dispatch) => {
  //console.log('userVerfy init', token)
  axios.get('http://localhost:3333/verify', {
    headers: { 
      token,
    }
  })
  .then( response => dispatch(registerToken(token)))
  .catch( err => {
    console.log('error en verificar token', err);
  })
}

export const logout = () => {
  console.log('logout');
  return {
    type: LOGOUT,
  }
}