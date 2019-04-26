import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

// REDUX
// This element is connected to the Redux store.
import { store } from '../redux/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

class PeliDetail extends connect(store)(PolymerElement) {
  static get properties() {
    return {
      pelis: Array,
      peliId: Number,
      peli: {
        type: Object,
      }
    }
  }

  static get template() {
    return html`
        <peli-form peli="{{peli}}"></peli-form>
      
      soy peli-detail [[peliId]] [[peliData.nombre]]
    `;
  }

  findPeli(pelis, peliId) {
    let peli = pelis.find( item => (item.id == peliId));
    console.log('findPeli', peli)
    return peli;
  }

  stateChanged(state) {
    this.pelis = state.pelis.pelis;
    if(this.pelis) {
      this.peli = this.findPeli(this.pelis, this.peliId);
    }
  }
}

customElements.define('peli-detail', PeliDetail);