/**
 * @param {string} prefix
 * @param {string} suffix
 * @returns {string}
 */
export const uid = (prefix = '', suffix = '') => {
  return prefix + Date.now().toString(36) + Math.random().toString(36).substring(2) + suffix;
}

/**
 * @return {string}
 */
export const cryptoUuid = () => {
  return crypto.randomUUID();
}

/**
 * @return {number}
 */
export const uniqueNumber = () => {
  return Math.floor(Date.now() * Math.random());
}