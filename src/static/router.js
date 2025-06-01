import {importScript} from './lib/base.js';

export const pageComponentsTags = {
  pageTag: 'page-tag'
};

/** @type { Map<string, { componentTag: string, requiredResources: Array<string> | null, requiredResourcesPROD: Array<string> | null}>} */
export const routePaths = new Map([
  ['/client-side-route-path', {
    componentTag: pageComponentsTags.pageTag,
    requiredResourcesTest: ['/test-url-to-local-files.js'],
    requiredResources: ['/prod-url-to-dist-files.js']
  }]
]);

/** @type {HTMLElement} */
const rootSectionElement = document.querySelector('root-section');

/**
 * @param {Event | null} [event]
 * @param {string} targetPath
 */
const route = (event, targetPath) => {
  event?.preventDefault();
  if (!targetPath || targetPath.trim().length === 0 || window.location.pathname === targetPath) {
    return;
  }
  window.history.pushState({}, '', targetPath);
  handleLocation();
}

/** @param {string} routePathKey */
const addScripts = (routePathKey) => {
  switch (app.env) {
    case 'TEST':
      routePaths.get(routePathKey)?.requiredResourcesTest?.forEach(resource => importScript(resource, 'module'));
      break;
    case 'PROD':
      routePaths.get(routePathKey)?.requiredResources?.forEach(resource => importScript(resource, 'module'));
      break;
    default:
      console.warn('Application is not running in either TEST or PROD environment. Malfunctions might occur.');
  }
}

/** @param {string} pageComponentTag */
const renderPage = (pageComponentTag) => {
  if (!pageComponentTag) {
    console.error('Lacking page component tag to render. Aborting render page!');
    return;
  }
  if (!rootSectionElement) {
    console.error('Lacking page component tag to render. Aborting render page!');
    return;
  }
  if (rootSectionElement.shadowRoot.querySelector(pageComponentTag)) {
    return;
  }
  rootSectionElement.dispatchEvent(new CustomEvent('render-request', {'detail': pageComponentTag}));
}

const handleLocation = async () => {
  /** @type {string} */
  const path = window.location.pathname;
  addScripts(path);
  renderPage(routePaths.get(path).componentTag);
}

window.route = route;
window.onpopstate = handleLocation;
handleLocation();