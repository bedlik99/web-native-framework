import {uid} from "../../common/encryption";


export const buttonIds = {
  customBtnId: uid('customBtnId-')
};

/** @type {string} */
export const buttonHtmlTemplate = /*html*/`
<button id=${buttonIds.customBtnId} class="custom-btn"><div>Click</div></button>
`;