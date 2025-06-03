export const validateSessionToken = () => {
  const accessTokenSessionName = 'accessToken';
  const token = sessionStorage.getItem(accessTokenSessionName)?.split(' ')[1];
  if (!token || !token.trim()) {
    return false;
  }
  /** @type {{iss?: string; sub?: string; aud?: string[] | string; exp?: number; nbf?: number; iat?: number; jti?: string;}} */
  let decoded;
  try {
    decoded = parseJwt(token);
  } catch (error) {
    sessionStorage.removeItem(accessTokenSessionName);
    return false;
  }
  if (decoded.iss !== '_ISSUER_IDENTIFIER_') {
    sessionStorage.removeItem(accessTokenSessionName);
    return false;
  }
  // seconds or milliseconds
  const expirationTime = String(decoded.exp);
  // trimmed to seconds or left in milliseconds
  const currentTime = new Date().getTime().toString().substring(0, expirationTime.length);
  const timeLeft = Number(expirationTime) - Number(currentTime);
  if (timeLeft <= 0) {
    sessionStorage.removeItem(accessTokenSessionName);
    return false;
  }
  return true;
};

export const getUserId = () => {
  const accessTokenSessionName = 'accessToken';
  const token = sessionStorage.getItem(accessTokenSessionName)?.split(' ')[1];
  if (!token || !token.trim()) {
    return null;
  }
  /** @type {{iss?: string; sub?: string; aud?: string[] | string; exp?: number; nbf?: number; iat?: number; jti?: string;}} */
  let decoded;
  try {
    decoded = parseJwt(token);
  } catch (error) {
    sessionStorage.removeItem(accessTokenSessionName);
    return null;
  }
  if (decoded.iss !== '_ISSUER_IDENTIFIER_') {
    sessionStorage.removeItem(accessTokenSessionName);
    return null;
  }
  return decoded.sub ? decoded.sub : null;
};

const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
      atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
  );
  return JSON.parse(jsonPayload);
}
