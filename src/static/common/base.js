/**
 * @class WebComponent
 * @typedef {WebComponent}
 * @extends {HTMLElement}
 */
export class WebComponent extends HTMLElement {
  /** @type {{ value: string}} */
  static INITIAL_RENDER_PROP = Object.freeze({value: '_CONNECTED_'});

  /** @type {boolean} */
  #hasMounted = false;

  /**
   * Creates an instance of WebComponent.
   * @constructor
   * @param {string} htmlTemplate
   * @param {string} styles
   */
  constructor(htmlTemplate, styles = '') {
    super();
    /** @type {HTMLTemplateElement} */
    const template = document.createElement('template');
    template.innerHTML = styles + htmlTemplate;
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  onInit() {
  }

  assignEventListeners() {
  }

  /**
   * @param {string} prop
   * @param {string} oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(prop, oldValue, newValue) {
    if (oldValue === newValue || !this.#hasMounted) {
      return;
    }
    this.render(prop);
  }

  connectedCallback() {
    this.onInit();
    this.render(WebComponent.INITIAL_RENDER_PROP.value);
    this.assignEventListeners();
    this.#hasMounted = true;
  }

  disconnectedCallback() {
    this.onDestroy();
  }

  onDestroy() {
  }

  /** @param {string} [prop=''] */
  render(prop = '') {
  }

  /**
   * @returns {HTMLElement}
   * @param {string} elementId
   */
  element(elementId) {
    return this.shadowRoot.getElementById(elementId);
  }

  /**
   * @returns {boolean}
   */
  hasMounted() {
    return this.#hasMounted;
  }
}

export class Observable {
  /** @type {Array<{id: number, consumer: (data) => void}>} */
  #observers;
  /** @type {string} */
  #sessionKey;
  /** @type {any} */
  #data;

  constructor(sessionKey) {
    this.#observers = [];
    this.#sessionKey = sessionKey;
  }

  /** @param subscriber {{id: number, consumer: (data) => void}} */
  subscribe(subscriber) {
    if (this.existsWithId(subscriber.id)) {
      return;
    }
    this.#observers.push(subscriber);
  }

  /** @param id {number} */
  unsubscribe(id) {
    let iOut = 0;
    for (let i = 0; i < this.#observers.length; i++) {
      if (this.#observers[i].id !== id) {
        this.#observers[iOut++] = this.#observers[i];
      }
    }
    this.#observers.length = iOut;
  }

  /**
   * @param data {any}
   * @return {any}
   */
  emit(data) {
    this.#data = data;
    this.#observers.forEach((observer) => observer.consumer(data));
    if (this.#sessionKey) {
      sessionStorage.setItem(this.#sessionKey, data ? JSON.stringify(data) : '""');
    }
    return structuredClone(data);
  }

  getData() {
    if (this.#data !== undefined) {
      return this.#data;
    }
    const sessionData = sessionStorage.getItem(String(this.#sessionKey));
    if (!sessionData) {
      return undefined;
    }
    try {
      this.#data = JSON.parse(sessionData);
    } catch (jsonParseError) {
      console.error(`Could not parse JSON data from session variable: ${this.#sessionKey}. Error: ${jsonParseError}`);
      return undefined;
    }
    return this.#data;
  }

  /**
   * @param id {number}
   * @return {boolean}
   */
  existsWithId(id) {
    return this.#observers.some(obs => obs.id === id);
  }
}

/**
 * Dispatches event that will propagate across the shadow DOM boundary and will not go outside shadow DOM boundary
 * @param {HTMLElement} elementToDispatchEventOn
 * @param {string} eventId
 * @param {any} payload
 * @param shouldLog
 */
export const dispatch = (elementToDispatchEventOn, eventId, payload,
                         shouldLog = (window.app.env === 'TEST' || window.app.env === 'DEV')) => {
  if (shouldLog) {
    console.log('Dispatching event: [' + eventId + ']');
  }
  elementToDispatchEventOn.dispatchEvent(new CustomEvent(eventId, {detail: payload}));
};

/**
 * Dispatches event that will propagate across the shadow DOM boundary into the standard DOM
 * @param {HTMLElement} elementToDispatchEventOn
 * @param {string} eventId
 * @param {any} payload
 * @param shouldLog
 */
export const dispatchComposed = (elementToDispatchEventOn, eventId, payload,
                                 shouldLog = (window.app.env === 'TEST' || window.app.env === 'DEV')) => {
  if (shouldLog) {
    console.log('Dispatching event: [' + eventId + ']');
  }
  elementToDispatchEventOn.dispatchEvent(new CustomEvent(eventId, {detail: payload, bubbles: true, composed: true}));
};

/**
 * @param {string} htmlString
 * @returns {ChildNode | null}
 */
export function createHtmlElementFromText(htmlString) {
  /** @type {HTMLTemplateElement} */
  const element = document.createElement('template');
  element.innerHTML = htmlString.trim();
  return element.content.firstChild;
}

/**
 * @param {string} parentId
 * @param {string} elementId
 * @returns {boolean}
 */
export function isElementPresentInParent(parentId, elementId) {
  const htmlElementsArray = [...this.shadowRoot.getElementById(parentId).children];
  const element = htmlElementsArray.find(el => el.id === elementId);
  return !!element;
}

/**
 * @param src {string}
 * @param type {string}
 */
export const addHeader = (src, type) => {
  /** @type {HTMLScriptElement} */
  const script = document.createElement('script');
  script.type = type;
  script.src = src;
  document.head.appendChild(script);
}

/**
 * @param {string} url
 * @param {string} type
 */
export const importScript = (url, type) => {
  if (!url || !type) {
    return;
  }
  /** @type {string} */
  let parsedSrcUrl;
  /** @type {boolean} */
  let doesHeaderExist = false;
  for (const htmlHeader of Array.from(document.head.children)) {
    if (!htmlHeader?.src) {
      continue;
    }
    parsedSrcUrl = '/' + String(htmlHeader.src)
        .split('/')
        .filter((el, index) => index > 2)
        .join('/');
    if (htmlHeader.type === type && parsedSrcUrl === url) {
      doesHeaderExist = true;
      break;
    }
  }
  if (doesHeaderExist) {
    return;
  }
  addHeader(url, type);
}


(() => {
  window.app = {
    env: undefined,
    gatewayUrl: undefined,
    clientId: 'some-id',
    globalObservable: new Observable(),
  };
  if (!!document.getElementById('init-script-TEST')) {
    app.env = 'TEST';
    app.gatewayUrl = 'http://localhost:XYZ'
    return;
  }
  if (!!document.getElementById('init-script-PROD')) {
    app.env = 'PROD';
    app.gatewayUrl = ''
  }
})();
