import { negativeFeedback, positiveFeedback, loadingStart, loadingEnd, navigate } from './app_actions';
import { store } from '../store';

export const STORE_PELIS = 'STORE_PELIS';

export const getPelis = () => (dispatch) => {
  dispatch(loadingStart());
  axios.get('http://localhost:3333/peliculas')
    .then( response => {
      dispatch(savePelis(response.data));
    })
    .catch( err => {
      console.log('error en axios get pelis ');
      dispatch(negativeFeedback('No he podido encontrar las películas'));
    })
    .then( () => dispatch(loadingEnd()));
}

const savePelis = pelis => {
  return {
    type: STORE_PELIS,
    pelis
  }
}

export const insertPeli = (peli, token) => (dispatch) => {
  dispatch(loadingStart());
  axios.post('http://localhost:3333/peliculas', peli, {
    headers: { token }
  })
    .then( response => {
      dispatch(positiveFeedback('Insertado con éxito'));
      store.dispatch(getPelis());
      window.history.pushState({}, '', '/');
      store.dispatch(navigate('/'));
    })
    .catch( err => {
      dispatch(negativeFeedback('No he podido insertar la película'));
      dispatch(loadingEnd());
    });
}