/**
 * @param object1 {any}
 * @param object2 {any}
 * @return {boolean}
 */
export function deepEqualObject(object1, object2) {
  if ((typeof object1) !== (typeof object2)) {
    return false;
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if ((areObjects && !deepEqualObject(val1, val2)) || (!areObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}

/**
 * @param object {any}
 * @return {boolean}
 */
export function isObject(object) {
  return object != null && typeof object === 'object';
}

/**
 * @param obj {any}
 * @return {undefined|any}
 */
export function deepClone(obj) {
  if (obj === undefined) {
    console.warn('Provided undefined, when trying to clone object. Aborting operation.')
    return undefined;
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * @param obj {any}
 * @return {undefined|any}
 */
export function structuredDeepClone(obj) {
  if (obj === undefined) {
    console.warn('Provided undefined, when trying to clone object. Aborting operation.')
    return undefined;
  }
  return structuredClone(obj);
}
