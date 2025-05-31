import {homeStyles} from './home.css.js';
import { WebComponent } from '../lib/base.js';
import {pageComponentsTags} from "../router";
import {homeHtmlTemplate} from "./home.html";


class Home extends WebComponent {

  constructor() {
    super(homeHtmlTemplate, homeStyles);
  }

  static get observedAttributes() {
    return [];
  }

  handleProvinceSelected(data) {
  }

  assignEventListeners() {
  }

  applyEffect() { }

  onDestroy() {
  }

  /** @param {string} [prop=''] */
  render(prop = '') {
    this.applyEffect();
  }

}

customElements.get(pageComponentsTags.pageTag) || customElements.define(pageComponentsTags.pageTag, Home);
