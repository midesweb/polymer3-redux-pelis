import {
  STORE_PELIS,
} from '../actions/pelis_actions.js';

const INITIAL_STATE = {
  pelis: [],
};

const pelis = (state = INITIAL_STATE, action) => {
  //console.log('pelis reducer', action)
  switch (action.type) {
    case STORE_PELIS:
      return {
        ...state,
        pelis: action.pelis
      };
    default:
      return state;
  }
};

export default pelis;