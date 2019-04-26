export const UPDATE_PAGE = 'UPDATE_PAGE';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';

export const navigate = (path) => (dispatch) => {
  console.log('navigate', path, typeof(path))
  // Extract the page name from path.
  let page = path === '/' ? 'home' : path.slice(1);

  //extract segments
  const segments = page.split('/');
  if(segments.length > 1) {
    page = segments[0];
  }

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, segments));
};

const loadPage = (page, segments) => (dispatch) => {
  //console.log('loadpage', page)
  switch(page) {
    case 'home':
      import('../../views/pelis-home.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'peli':
      import('../../peli/peli-detail.js');
    case 'login':
      import('../../views/pelis-login.js');
    case 'insert':
      import('../../views/pelis-insert.js')
      break;
    case 'clasificaciones':
      import('../../views/pelis-clasificaciones.js')
      break;
    default:
      page = 'view404';
      import('../../views/pelis-view404.js');
  }

  dispatch(updatePage(page, segments));
};

const updatePage = (page, segments) => {
  return {
    type: UPDATE_PAGE,
    page,
    segments
  };
};

export const sendFeedback = (feedback) => {
  return {
    type: SEND_FEEDBACK,
    feedback
  }
} 

export const positiveFeedback = (msg) => {
  return sendFeedback({
    msg,
    status: 'success'
  })
}
export const negativeFeedback = (msg) => {
  return sendFeedback({
    msg,
    status: 'error'
  })
}

export const loadingStart = () => {
  return {
    type: LOADING_START
  }
}

export const loadingEnd = () => {
  return {
    type: LOADING_END
  }
}