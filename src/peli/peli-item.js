import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-item/paper-item-body';
/**
 * `peli-item` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class PeliItem extends PolymerElement {
  static get properties() {
    return {
      peli: Object
    }
  }

  static get template() {
    return html`
      <style>
      a {
        color: inherit;
      }
      </style>
      <a href$="/peli/[[peli.id]]">
        <paper-item>
          <paper-item-body two-line>
            <div>[[peli.nombre]]</div>
            <div secondary>[[peli.director]]</div>
          </paper-item-body>
          <iron-icon icon="chevron-right"></iron-icon>
        </paper-item>
      </a> 
    `;
  }

}

customElements.define('peli-item', PeliItem);