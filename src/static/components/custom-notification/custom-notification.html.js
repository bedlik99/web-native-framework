import {uid} from "../../common/encryption";


export const customNotificationIds = {
  notificationTextId: uid('notificationTextId-'),
  confirmBtnId: uid('confirmBtnId-'),
};

/** @type {string} */
export const customNotificationHtmlTemplate = /*html*/`
<div class='backdrop'>
  <div class='card'>
    <p id=${customNotificationIds.notificationTextId} class='notification-text-p'></p>
    <button id=${customNotificationIds.confirmBtnId} class='confirm-btn'>OK</button>
  </div>
</div>
`;