import {styles} from './app.css.js';
import {WebComponent} from './lib/base.js';

/** @type {string} */
const rootSectionId = 'root-section-id';

/** @type {string} */
const htmlTemplate = /*html*/`<div id=${rootSectionId} class='root-section'></div>`;

class App extends WebComponent {
  /** @type {HTMLDivElement} */
  #rootSection;

  constructor() {
    super(htmlTemplate, styles);
  }

  static get observedAttributes() {
    return [];
  }

  assignEventListeners() {
    this.addEventListener('render-request', (event) => this.render(event.detail));
  }

  onInit() {
    this.#rootSection = this.shadowRoot.getElementById(rootSectionId);
  }

  /** @param {string} customComponentName */
  render(customComponentName) {
    if (!customComponentName && this.hasMounted()) {
      console.warn('Should have provided component tag to render!. Rendering aborted');
      return;
    }
    this.#rootSection.replaceChildren(document.createElement(customComponentName));
  }

}

customElements.get('root-section') || customElements.define('root-section', App);