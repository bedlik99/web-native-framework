/**
 * @class {StringUtils}
 */
export class StringUtils {

  /**
   * @param email {string | null | undefined}
   * @return {boolean}
   */
  static isEmailValid(email) {
    const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
    return !!email && emailRegex.test(email);
  }

  /**
   * @param textToValidate {string | null | undefined}
   * @return {boolean}
   */
  static isBlank = (textToValidate) => {
    return !textToValidate || textToValidate.trim().length === 0;
  }

  /**
   * @param textToValidate {string | null | undefined}
   * @return {boolean}
   */
  static isNotBlank = (textToValidate) => {
    return !!textToValidate && textToValidate.trim().length !== 0;
  }

  /**
   * @param textToValidate {string | null | undefined}
   * @return {string}
   */
  static toString = (textToValidate) => {
    if (StringUtils.isBlank(textToValidate)) {
      return '';
    }
    return String(textToValidate);
  }

  /**
   * @param length {number}
   * @param textToValidate {string | undefined}
   * @return {boolean}
   */
  static isLengthMoreThan = (length, textToValidate) => {
    if (length < 0) {
      throw new Error('Length cannot be negative!');
    }
    return StringUtils.toString(textToValidate).length > length;
  }

  /**
   *
   * @param length {number}
   * @param textToValidate {string | undefined}
   * @return {boolean}
   */
  static isLengthLessThan = (length, textToValidate) => {
    if (length <= 0) {
      throw new Error('Length cannot be negative or 0!');
    }
    return StringUtils.toString(textToValidate).length < length;
  }

  /**
   * @param textToValidate {string}
   * @param min {number}
   * @param max {number}
   * @return {boolean}
   */
  static isLengthInRange = (min, max, textToValidate) => {
    return textToValidate.length >= min && textToValidate.length <= max;
  }

  /**
   * Returns date as string in [yyyy-MM-dd] format
   * @param {number | string} year
   * @param {number | string} month
   * @param {number | string} day
   * @returns {string}
   */
  static buildInternationalDateFormat = (year, month, day) => {
    return (
        String(year) + '-' +
        (String(month).length === 1 ? ('0' + String(month)) : String(month)) + '-' +
        (String(day).length === 1 ? ('0' + String(day)) : String(day))
    );
  }

  /**
   * Returns date as string in [yyyy-MM-dd] format
   * @param date {Date}
   * @return {string}
   */
  static convertToInternationalDateFormat = (date) => {
    /** @type {number} */
    const year = date.getFullYear();
    /** @type {number} */
    const month = date.getMonth() + 1;
    /** @type {number} */
    const day = date.getDate();
    return StringUtils.buildInternationalDateFormat(year, month, day);
  }

}
