/**
 * @param {{url: string, params: { method: string, body: any, headers: { 'Content-Type': string, 'Authorization': string | undefined}}}}
 * @param {Function | null} [onLoading=undefined]
 * @returns {Promise<{data: any, isOk: boolean, error: any}>}
 */
export const apiFetch = async ({url, params}, onLoading = undefined) => {
  if (!url || !params) {
    throw new Error('No call configuration provided!');
  }
  if (!!onLoading && typeof onLoading === 'function') {
    onLoading();
  }
  /** @type {Response} */
  let response;
  try {
    response = await fetch(url, {
      method: params.method,
      body: JSON.stringify(params.body),
      headers: params.headers
    });
  } catch (err) {
    console.error(`Error occurred during call to: ${url}, error: ${err}`);
    return {data: undefined, isOk: false, errors: err};
  }
  return await handleResponse(response);
}

/**
 * @param {{url: string, params: { method: string, body: any, headers: { 'Content-Type': string, 'Authorization': string | undefined}}}}
 * @param {Function | null} [onLoading=undefined]
 * @returns {Promise<{data: any, isOk: boolean, error: any}>}
 */
export const apiFetchMultipartData = async ({url, params}, onLoading = undefined) => {
  if (!url || !params) {
    throw new Error('No call configuration provided!');
  }
  if (!!onLoading && typeof onLoading === 'function') {
    onLoading();
  }
  // We create a FormData object and add the selected file
  const formData = new FormData();
  formData.append("file", params.body);

  const response = await fetch(url, {
    method: params.method,
    body: formData,
    headers: params.headers
  });

  return await handleResponse(response);
}

/** @deprecated */
export const sendMultipartDataWithXMLRequest = async ({url, params}) => {
  if (!url || !params) {
    throw new Error('Provided no call configuration!');
  }
  // Creates an XMLHttpRequest instance
  const xhr = new XMLHttpRequest();

  // We set up the callback to handle the server response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // The file has been uploaded successfully
      console.log("File successfully uploaded!");
    }
  };

  // We open the connection to the server
  if (params.method) {
    xhr.open(params.method, url, true);
  }

  // We set the "Content-Type" header to "multipart/form-data"
  if (params.headers) {
    xhr.setRequestHeader("Authorization", params.headers["Authorization"]);
  }

  // We create a FormData object and add the selected file
  const formData = new FormData();
  formData.append("file", params.body);
  // We send the request to the server with the send() method
  xhr.send(formData);
}

export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorResponse = await response.text();
    console.error(`Unsuccessful request to: ${response.url} - HTTP response code: ${response.status} - Message: ${errorResponse}`);
    return {data: undefined, isOk: false, error: errorResponse};
  }
  let result;
  try {
    result = await response.json();
    return {data: result, isOk: true, error: null};
  } catch (jsonParseException) {
    result = await response.text();
    if (result) {
      console.warn("Returned value not in JSON format: " + result);
      return {data: result, isOk: true, error: null};
    }
  }
  return {data: null, isOk: true, error: null};
}

export const getErrorDetails = (error) => {
  if (!error) {
    return {
      status: 0,
      statusText: 'No error details provided'
    }
  }
  try {
    if (error instanceof Error) {
      return JSON.parse((error).message);
    }
    if (error instanceof Object) {
      return error;
    }
    return JSON.parse(error);
  } catch (jsonParseException) {
    console.warn("Error parsing JSON response: " + jsonParseException);
    return {
      status: 400,
      statusText: error
    }
  }
}
