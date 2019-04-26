import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/polymer/lib/elements/dom-if';

/**
 * `ajax-loading` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class AjaxLoading extends PolymerElement {
  static get properties() {
    return {
      loading: Boolean
    }
  }

  static get template() {
    return html`
      <style>
        :host {
          --paper-spinner-stroke-width: 7px;
        }
        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(220,230,230, 0.8);
        }
        .spinner {
          background-color: #fff;
          width: 100px;
          height: 100px;
          border-radius: 100px;
          border: 4px solid #eee;
        }
      </style>
      <template is="dom-if" if="[[loading]]">
        <div class="container">
          <div class="spinner">
            <paper-spinner active="[[loading]]"></paper-spinner>
          </div>
        </div>
      </template>
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
}

customElements.define('ajax-loading', AjaxLoading);