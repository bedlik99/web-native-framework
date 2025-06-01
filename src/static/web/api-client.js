import {apiFetch} from "../common/web";

/** @class Api */
export class Api {
  static #instance;

  constructor() {
    if (Api.#instance) {
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
  }

  /** @returns {Api} */
  static getInstance() {
    if (Api.#instance) {
      return Api.#instance;
    }
    Api.#instance = new Api();
    return Api.#instance;
  }

  /**
   * @param {Function | null} applyOnLoading
   * @return {Promise<{data: any, isOk: boolean, errors: any}>}
   */
   async exampleApiMethod(applyOnLoading) {
    return apiFetch(applyOnLoading, {
      url: `/your_url`,
      params: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Id': `CUSTOM_CLIENT_ID`,
        }
      }
    });
  }
}