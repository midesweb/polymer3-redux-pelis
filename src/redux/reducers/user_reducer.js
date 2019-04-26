import {
  REGISTER_TOKEN,
  LOGOUT
} from '../actions/user_actions';

const INITIAL_STATE = {
  loggedIn: false,
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  //console.log('user reducer', action)
  switch (action.type) {
    case REGISTER_TOKEN:
      return {
        ...state,
        loggedIn: true,
        token: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: ''
      }
    default:
      return state;
  }
};

export default user;