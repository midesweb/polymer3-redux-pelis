import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '../styles/shared-styles';

/**
 * `pelis-view404` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PelisView404 extends PolymerElement {
  static get properties() {
    return {

    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
      </style>
      <h1>Página no encontrada</h1>
      <p>La página que buscas no se encuentra en esta app.</p>
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

customElements.define('pelis-view404', PelisView404);