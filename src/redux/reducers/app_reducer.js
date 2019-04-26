import {
  UPDATE_PAGE,
  SEND_FEEDBACK,
  LOADING_START,
  LOADING_END
} from '../actions/app_actions.js';

const INITIAL_STATE = {
  page: '',
  pageSegments: [],
  loading: false,
  feedback: null
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        feedback: null,
        page: action.page,
        pageSegments: action.segments,
      };
    case SEND_FEEDBACK: 
      return {
        ...state,
        feedback: action.feedback
      }
    case LOADING_START:
      return {
        ...state,
        feedback: null,
        loading: true
      }
    case LOADING_END:
      return {
        ...state,
        feedback: null,
        loading: false
      }
    default:
      return state;
  }
};

export default app;