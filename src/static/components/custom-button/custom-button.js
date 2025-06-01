import {styles} from './custom-button.css.js';
import {buttonHtmlTemplate, buttonIds} from './custom-button.html.js';
import {dispatch, WebComponent} from '../../common/base.js';


export class CustomButton extends WebComponent {
  /** @type {HTMLButtonElement} */
  #btn;

  constructor() {
    super(buttonHtmlTemplate, styles);
  }

  static get observedAttributes() {
    return ['label_text', 'on_click_event_id', 'is_loading'];
  }

  handleClick() {
    dispatch(this, this.on_click_event_id, null);
  }

  assignEventListeners() {
    this.#btn.addEventListener('click', this.handleClick.bind(this));
  }

  onInit() {
  }

  onDestroy() {
  }

  /** @param {string} prop */
  render(prop) {
    if (!this.#btn) {
      this.#btn = this.element(buttonIds.customBtnId);
    }
    switch (prop) {
      case WebComponent.INITIAL_RENDER_PROP.value: {
        this.#btn.textContent = this.label_text;
        if (this.is_loading === 'true') {
          this.#btn.className = 'custom-btn-loading';
          this.#btn.innerHTML = '<div class="loader">&nbsp;</div>';
          break;
        }
        break;
      }
      case 'label_text': {
        this.#btn.textContent = this.label_text;
        break;
      }
      case 'is_loading': {
        if (this.is_loading !== 'true') {
          this.#btn.className = 'custom-btn';
          this.#btn.textContent = this.label_text;
          return;
        }
        this.#btn.className = 'custom-btn-loading';
        this.#btn.innerHTML = '<div class="loader">&nbsp;</div>';
        break;
      }
    }
  }

  get label_text() {
    return this.getAttribute('label_text');
  }

  set label_text(value) {
    return this.setAttribute('label_text', value);
  }

  get on_click_event_id() {
    return this.getAttribute('on_click_event_id');
  }

  set on_click_event_id(value) {
    return this.setAttribute('on_click_event_id', value);
  }

  get is_loading() {
    return this.getAttribute('is_loading');
  }

  set is_loading(value) {
    return this.setAttribute('is_loading', value);
  }

}

customElements.get('custom-button') || customElements.define('custom-button', CustomButton);