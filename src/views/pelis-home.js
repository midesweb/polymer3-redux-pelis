import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-button/paper-button.js';

import { negativeFeedback } from '../redux/actions/app_actions';
// MY ELEMENTS
import '../styles/shared-styles';
import '../peli/peli-item';

// REDUX
// This element is connected to the Redux store.
import { store } from '../redux/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';


class PelisHome extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      pelis: {
        type: Array,
        value: function() { return [] }
      },
      loggedIn: Boolean,
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        paper-button a {
          color: inherit;
        }
        paper-button {
          --paper-button: {
            background-color: var(--app-primary-color);
            color: #fff;
          }
        }
      </style>
      <h1>Pelis home</h1>
      <paper-button on-click="insertar">Insertar</paper-button>
      <a href="/clasificaciones"><paper-button>Clasificaciones</paper-button></a>
      <template is="dom-repeat" items="[[pelis]]" as="peli">
        <peli-item peli="[[peli]]"></peli-item>
      </template>
    `;
  }

  stateChanged(state) {
    this.loggedIn = state.user.loggedIn;
  }

  insertar() {
    if(!this.loggedIn) {
      store.dispatch(negativeFeedback('Debes estar autenticado para insertar'));
      return;
    }
    this.dispatchEvent(new CustomEvent('navigate', {
      bubbles: true,
      composed: true,
      detail: {
        page: '/insert'
      }
    }));
  }
}

customElements.define('pelis-home', PelisHome);