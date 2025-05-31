import { apiFetch } from "../lib/base.js";

/** @class Api */
class Api {
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
   * @async
   * @param {Function | null} applyOnLoading
   * @return {Promise<{data: any, isOk: boolean, errors: any}>}
   */
   exampleApiMethod(applyOnLoading) {
    return apiFetch(applyOnLoading, {
      url: `/your_url`,
      params: {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Client-Id': `SOME_CLIENT_ID`,
        }
      }
    });
  }
}

/** @type {Api} */
export const api = Api.getInstance();