import {uid} from "../../lib/base.js";

export const customNotificationIds = {
  customBtnId: uid('customBtnId-')
};

/** @type {string} */
export const customNotificationHtmlTemplate = /*html*/`<button id=${customNotificationIds.customBtnId} class="custom-btn"><div>Click</div></button>`;