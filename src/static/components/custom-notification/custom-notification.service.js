import {createHtmlElementFromText} from "../../common/base";


export class CustomNotificationService {
  static #instance;

  constructor() {
    if (CustomNotificationService.#instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
  }

  /** @returns {CustomNotificationService} */
  static getInstance() {
    if (CustomNotificationService.#instance) {
      return CustomNotificationService.#instance;
    }
    CustomNotificationService.#instance = new CustomNotificationService();
    return CustomNotificationService.#instance;
  }

  /**
   * @param {string} text
   * @param {string} eventName
   * @param {any} onNotificationConfirmation
   * @returns {ChildNode | null}
   */
  createNotification(text, eventName, onNotificationConfirmation) {
    const notificationElement = createHtmlElementFromText(/*template*/`
        <custom-notification information_text=${text} confirm_event_name=${eventName}></custom-notification>
    `);
    notificationElement.addEventListener(eventName, onNotificationConfirmation);
    return notificationElement;
  }

}