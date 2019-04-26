import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';

// MY ELEMENTS
import '../styles/shared-styles';
import '../clasificacion/clasificacion-item';
// REDUX
// This element is connected to the Redux store.
import { store } from '../redux/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { clasificaciones } from '../redux/reducers/clasificaciones_reducer';
store.addReducers({clasificaciones});

import { getClasificaciones } from '../redux/actions/clasificaciones_actions';

class PelisClasificaciones extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      clasificaciones: {
        type: Array,
        value: function() { return [] }
      },
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
    
      </style>
      <h1>Clasificaciones</h1>
      <template is="dom-repeat" items="[[clasificaciones]]" as="clasificacion">
        <clasificacion-item clasificacion="[[clasificacion]]"></clasificacion-item>
      </template>
    `;
  }

  stateChanged(state) {
    this.clasificaciones = state.clasificaciones.clasificaciones;
  }

  ready() {
    super.ready();
    console.log('READY')
    store.dispatch(getClasificaciones());
  }
}

customElements.define('pelis-clasificaciones', PelisClasificaciones);