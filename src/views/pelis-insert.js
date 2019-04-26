import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

import { insertPeli } from '../redux/actions/pelis_actions';

// MY ELEMENTS
import '../styles/shared-styles';
import '../peli/peli-form';

// REDUX
// This element is connected to the Redux store.
import { store } from '../redux/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';


class PelisInsert extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      peli: {
        type: Object,
        value: function() {
          return {
            nombre: '',
            director: ''
          }
        }
      },
      loggedIn: Boolean,
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
    
      </style>
      <h1>Crear una película</h1>
      <template is="dom-if" if="[[!loggedIn]]">
        <p>Debes estar autenticado en esta aplicación</p>
      </template>
      <template is="dom-if" if="[[loggedIn]]">
        <peli-form peli="{{peli}}"></peli-form>
        <paper-button on-click="doInsert">Insertar</paper-button>
      </template>
    `;
  }

  stateChanged(state) {
    this.loggedIn = state.user.loggedIn;
    this.token = state.user.token;
  }

  doInsert() {
    console.log('insertar', this.peli);
    store.dispatch(insertPeli(this.peli, this.token));
  }
}

customElements.define('pelis-insert', PelisInsert);