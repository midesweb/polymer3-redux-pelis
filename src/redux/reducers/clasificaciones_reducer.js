import {
  STORE_CLASIFICACIONES,
} from '../actions/clasificaciones_actions.js';

const INITIAL_STATE = {
  clasificaciones: [],
};

export const clasificaciones = (state = INITIAL_STATE, action) => {
  //console.log('clasificaciones reducer', action)
  switch (action.type) {
    case STORE_CLASIFICACIONES:
      return {
        ...state,
        clasificaciones: action.clasificaciones
      };
    default:
      return state;
  }
};

export default clasificaciones;