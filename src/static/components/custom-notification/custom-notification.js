import {WebComponent} from '../../lib/base.js';
import {customNotificationStyles} from "./custom-notification.css";
import {customNotificationHtmlTemplate} from "./custom-notification.html";
import {CustomNotificationService} from "./custom-notification.service";


export class CustomNotification extends WebComponent {
  /** @type {HTMLButtonElement} */
  #confirmButton;
  /** @type {CustomNotificationService} */
  #customNotificationService;

  constructor() {
    super(customNotificationHtmlTemplate, customNotificationStyles);
    this.#customNotificationService = CustomNotificationService.getInstance();
  }

  onConfirmButtonClick() {
    this.dispatchEvent(new Event(this.confirm_event_name));
    this.remove();
  }

  assignEventListeners() {
    this.#confirmButton.addEventListener('click', this.onConfirmButtonClick.bind(this));
  }

  static get observedAttributes() {
    return [];
  }

  /** @param {string} [prop=''] */
  render(prop = '') {
    this.#confirmButton = this.shadowRoot.getElementById('confirm-btn');
    this.shadowRoot.querySelector('#notification-text').innerHTML = String(this.information_text)
      .replace(new RegExp('_', 'g'), ' ')
      .replace(new RegExp('{NL}', 'g'), '<br>');
  }

  get information_text() {
    return this.getAttribute('information_text');
  }

  set information_text(value) {
    this.setAttribute('information_text', value);
  }

  get confirm_event_name() {
    return this.getAttribute('confirm_event_name');
  }

  set confirm_event_name(value) {
    this.setAttribute('confirm_event_name', value);
  }

}

customElements.get('custom-notification') || customElements.define('custom-notification', CustomNotification);

