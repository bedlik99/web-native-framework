import {uid} from "../common/encryption";

export const homeIds = {
  homeId: uid('homeId-'),
};

/** @type {string} */
export const homeHtmlTemplate = /*html*/`<div id=${homeIds.homeId}><h1>HOME</h1></div>`;