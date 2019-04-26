import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';

// REDUX  
import { loginUser } from '../redux/actions/user_actions';
import { store } from '../redux/store';

import '../styles/shared-styles';

/**
 * `pelis-login` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PelisLogin extends PolymerElement {
  static get properties() {
    return {
      logged: {
        type: Boolean,
        value: false
      },
      user: {
        type: Object,
        value: function() {
          return {
            email: 'user@example.com',
            password: '1234'
          }
        }
      }
    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        div {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 20px;
        }
      </style>
      <h1>Pelis Login</h1>  

      <template is="dom-if" if="[[logged]]">
        Estás logueado
      </template>
      <div>
        <template is="dom-if" if="[[!logged]]">
          <paper-input value="{{user.email}}" label="email"></paper-input>
          <paper-input value="{{user.password}}" type="password" label="Password"></paper-input>
          <paper-button on-click="login" raised>Login</paper-button>
        </template>
      </div>
    `;
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }

  login() {
    store.dispatch(loginUser(this.user))
  }
}

customElements.define('pelis-login', PelisLogin);