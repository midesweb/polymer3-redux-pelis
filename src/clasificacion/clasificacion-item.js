import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * `clasificacion-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class ClasificacionItem extends PolymerElement {
  static get properties() {
    return {
      clasificacion: Object
    }
  }

  static get template() {
    return html`
      <p>[[clasificacion.id]]: [[clasificacion.nombre]]</p>
    `;
  }

  /**
   * Use for one-time configuration of your component after local
   * DOM is initialized.
   */
  ready() {
    super.ready();
  }
}

customElements.define('clasificacion-item', ClasificacionItem);