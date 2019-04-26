import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

// POLYMER CATALOG
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-toast/paper-toast';
import '@polymer/app-storage/app-localstorage/app-localstorage-document'

// ROUTER
import { installRouter } from 'pwa-helpers/router.js';

// MY COMPONENTS
import '../interface/ajax-loading';
import '../interface/user-login-buttons';

// REDUX
// This element is connected to the Redux store.
import { store } from '../redux/store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';



import { getPelis } from '../redux/actions/pelis_actions';
// These are the actions needed by this element.
import { navigate } from '../redux/actions/app_actions.js';
import { userVerify } from '../redux/actions/user_actions.js';


class PelisApp extends connect(store)(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --app-drawer-width: 256px;
          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;
          --app-header-background-color: #e8f5f5;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);
          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }
        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }
        .toolbar-top {
          background-color: var(--app-header-background-color);
        }
        main {
          padding: 10px;
        }
        #toastError {
          --paper-toast-background-color: red;
        }
        app-toolbar a {
          color: var(--app-primary-color);
        }
      </style>

      <app-localstorage-document 
        key="token" 
        id="tokenStorage" 
        data="[[_token]]"
        on-data-changed="tokenStorageChanged"
      ></app-localstorage-document>

      <app-header-layout fullbleed >
        <app-header slot="header" condenses reveals effects="waterfall">
          <app-toolbar>
            <a href="/"><paper-icon-button icon="home"></paper-icon-button></a>
            <div main-title>Pelis</div>
            <user-login-buttons logged-in="[[_loggedIn]]"></user-login-buttons>
          </app-toolbar>
        </app-header>
        <main>
          <iron-pages selected="[[_page]]" attr-for-selected="page">
            <pelis-home page="home" pelis="[[pelis]]"></pelis-home>
            <peli-detail page="peli" peli-id="[[peliId]]" pelis="[[pelis]]"></peli-detail>
            <pelis-login page="login" ></pelis-login>
            <pelis-insert page="insert" logged-in="[[_loggedIn]]"></pelis-insert>
            <pelis-clasificaciones page="clasificaciones"></pelis-clasificaciones>
            <pelis-view404 page="view404"></pelis-view404>
          </iron-pages>
        </main>
      </app-header-layout>

      <ajax-loading loading="[[_loading]]"></ajax-loading>
      <paper-toast id="toast"></paper-toast>
      <paper-toast id="toastError"></paper-toast>
    `;
  }
  static get properties() {
    return {
      _page: {
        type: String,
      },
      _pageSegments: {
        type: Array,
        value: function() { return [] }
      },
      feedback: {
        type: Object,
        observer: 'feedbackObserver'
      },
      pelis: {
        type: Array,
        value: function() { return [] }
      },
      peliId: {
        type: Number,
        computed: 'extractPeliId(_pageSegments)'
      },
      _loading: Boolean,
      _loggedIn: Boolean,
      _token: String,
    };
  }

  ready() {
    super.ready();

    // Router
    //installRouter((location) => console.log('navegar', location));
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));

    // Manejadores feedback messages (gestión mediante eventos)
    this.addEventListener('toast-error', (e) => this.toastError(e) );
    this.addEventListener('toast-message', (e) => this.toastMessage(e) );

    // Manejador para navegación
    this.addEventListener('navigate', (e) => this.navigate(e.detail.page))

    // Pelis
    store.dispatch(getPelis());

  }

  stateChanged(state) {
    console.log('statechanged pelis-app', state);
    this._page = state.app.page;
    this._pageSegments = state.app.pageSegments;
    if(state.app.feedback) {
      this.doFeedback(state.app.feedback);
    }
    this.pelis = state.pelis.pelis;
    this._loading = state.app.loading;
    this._loggedIn = state.user.loggedIn;
    this._token = state.user.token;
  }

  extractPeliId(segments){
    if(segments.length > 1 && segments[0] == 'peli') {
      //console.log('extract Peli id:', segments[1])
      return parseInt(segments[1]);
    }
    return null;
  }

  doFeedback(feedback) {
    if(feedback.status == 'error') {
      this.$.toastError.show({
        text: feedback.msg,
        duration: 3000
      });
    }
  }

  navigate(page) {
    console.log('navigate', page);
    window.history.pushState({}, '', page);
    store.dispatch(navigate(page));
  }

  toastMessage(e) {
    this.$.toast.show({text: e.detail, duration: 3000});
  }
  toastError(e) {
    this.$.toastError.show({text: e.detail, duration: 3000});
  }

  tokenStorageChanged(e) {
    //console.log('tokenStorageChanged', e.detail);
    if(!this.token && e.detail.value) {
      store.dispatch(userVerify(e.detail.value))
    }
  }
}

window.customElements.define('pelis-app', PelisApp);
