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

  subscribe(subscriber) {
    if (this.existsWithId(subscriber.id)) {
      return;
    }
    this.#observers.push(subscriber);
  }

  unsubscribe(id) {
    let iOut = 0;
    for (let i = 0; i < this.#observers.length; i++) {
      if (this.#observers[i].id !== id) {
        this.#observers[iOut++] = this.#observers[i];
      }
    }
    this.#observers.length = iOut;
  }

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

  existsWithId(id) {
    return this.#observers.some(obs => obs.id === id);
  }
}

/**
 * @async
 * @param {Function | null} [onLoading=undefined]
 * @param {{url: string, params: { method: string, body: any, headers: { 'Content-Type': string, 'Authorization': string | undefined}}}}
 * @returns {Promise<{data: any, isOk: boolean, errors: any}>}
 */
export const apiFetch = async (onLoading = undefined, {url, params}) => {
  if (!url || !params) {
    throw new Error('Provided no call configuration!');
  }
  if (!!onLoading && typeof onLoading === 'function') {
    onLoading();
  }
  try {
    /** @type {Response} */
    const response = await fetch(url, {
      method: params.method,
      body: JSON.stringify(params.body),
      headers: params.headers
    });
    if (!response.ok) {
      console.error(`Unsuccessful request to: ${url} - HTTP response code: ${response.status} - Message: ${(await response.text())}`);
      return {data: undefined, isOk: false, errors: err};
    }
    /** @type {any} */
    let result;
    try {
      result = await response.json();
    } catch (jsonParseException) {
      if (result) {
        console.warn("Returned value not in JSON format: " + result);
      }
      result = await response.text();
    }
    return {data: result, isOk: true, errors: null};
  } catch (err) {
    console.error(`Error occurred during call to: ${url}, error: ${err}`);
    return {data: undefined, isOk: false, errors: err};
  }
}

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
 * Returns date as string in [yyyy-MM-dd] format
 * @param {number | string} year
 * @param {number | string} month
 * @param {number | string} day
 * @returns {string}
 */
export function toInternationalDateFormat(year, month, day) {
  return (
      String(year) + '-' +
      (String(month).length === 1 ? ('0' + String(month)) : String(month)) + '-' +
      (String(day).length === 1 ? ('0' + String(day)) : String(day))
  );
}

/**
 * @param {string} url
 * @param {string} type
 */
export const importScript = (url, type) => {
  if (!url || !type) {
    return;
  }
  const doesHeaderExists = Array.from(document.head.children)
      .filter(htmlHeader => htmlHeader.src)
      .map(htmlHeader => {
        return {
          type: htmlHeader.type,
          url: '/' +
              String(htmlHeader.src)
                  .split('/')
                  .filter((el, index) => index > 2)
                  .join('/')
        };
      })
      .find(scriptInfo => scriptInfo.type === type && scriptInfo.url === url);
  if (!doesHeaderExists) {
    /** @type {HTMLScriptElement} */
    const script = document.createElement('script');
    script.type = type;
    script.src = url;
    document.head.appendChild(script);
  }
}

/**
 * Dispatches event that will propagate across the shadow DOM boundary and will not go outside shadow DOM boundary
 * @param {HTMLElement} elementToDispatchEventOn
 * @param {string} eventId
 * @param {any} payload
 */
export const dispatch = (elementToDispatchEventOn, eventId, payload) => {
  elementToDispatchEventOn.dispatchEvent(new CustomEvent(eventId, {detail: payload}))
};

/**
 * Dispatches event that will propagate across the shadow DOM boundary into the standard DOM
 * @param {HTMLElement} elementToDispatchEventOn
 * @param {string} eventId
 * @param {any} payload
 */
export const dispatchComposed = (elementToDispatchEventOn, eventId, payload) => {
  elementToDispatchEventOn.dispatchEvent(
      new CustomEvent(eventId, {
            detail: payload,
            bubbles: true,
            composed: true
          }
      )
  );
};

/**
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
export const uid = (prefix = '', suffix = '') => {
  return prefix + Date.now().toString(36) + Math.random().toString(36).substring(2) + suffix;
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
