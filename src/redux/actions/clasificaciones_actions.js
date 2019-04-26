import { negativeFeedback, positiveFeedback, loadingStart, loadingEnd} from './app_actions';
import { store } from '../store';

export const STORE_CLASIFICACIONES = 'STORE_CLASIFICACIONES';

export const getClasificaciones = () => (dispatch) => {
  console.log('ejecutando get clasificaciones ');
  dispatch(loadingStart());
  axios.get('http://localhost:3333/clasificaciones')
    .then( response => {
      dispatch(saveClasificaciones(response.data));
    })
    .catch( err => {
      console.log('error en axios get clasificaciones ');
      dispatch(negativeFeedback('No he podido encontrar las clasificaciones'));
    })
    .then( () => dispatch(loadingEnd()));
}

const saveClasificaciones = clasificaciones => {
  return {
    type: STORE_CLASIFICACIONES,
    clasificaciones
  }
}
