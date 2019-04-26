import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';


class PeliForm extends PolymerElement {
  static get properties() {
    return {
      peli: {
        type: Object,
        notify: true
      }
    }
  }

  static get template() {
    return html`
      <paper-input value="{{peli.nombre}}" label="Nombre"></paper-input>
      <paper-input value="{{peli.director}}" label="Director"></paper-input>
    `;
  }

 
}

customElements.define('peli-form', PeliForm);