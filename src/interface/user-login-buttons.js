import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import { logout } from '../redux/actions/user_actions';
import {store} from '../redux/store';

class UserLoginButtons extends PolymerElement {
  static get properties() {
    return {
      loggedIn: Boolean
    }
  }

  static get template() {
    return html`
      <style>
        a, paper-icon-button {
          color: var(--app-primary-color);
        }
      </style>
      <template is="dom-if" if="[[!loggedIn]]">
        <a href="/login"><paper-icon-button icon="account-box"></paper-icon-button></a>
      </template>
      <template is="dom-if" if="[[loggedIn]]">
        <paper-icon-button icon="exit-to-app" on-click="logout"></paper-icon-button> 
      </template>
    `;
  }

  logout() {
    store.dispatch(logout());
  }
}

customElements.define('user-login-buttons', UserLoginButtons);