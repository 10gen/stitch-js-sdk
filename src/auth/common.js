export const USER_AUTH_KEY = '_stitch_ua';
export const REFRESH_TOKEN_KEY = '_stitch_rt';
export const DEVICE_ID_KEY = '_stitch_did';
export const STATE_KEY = '_stitch_state';
export const IMPERSONATION_ACTIVE_KEY = '_stitch_impers_active';
export const IMPERSONATION_USER_KEY = '_stitch_impers_user';
export const IMPERSONATION_REAL_USER_AUTH_KEY = '_stitch_impers_real_ua';
export const USER_AUTH_COOKIE_NAME = 'stitch_ua';
export const STITCH_ERROR_KEY = '_stitch_error';
export const STITCH_LINK_KEY = '_stitch_link';
export const DEFAULT_ACCESS_TOKEN_EXPIRE_WITHIN_SECS = 10;

export const APP_CLIENT_CODEC = {
  'accessToken': 'accessToken',
  'refreshToken': 'refreshToken',
  'deviceId': 'deviceId',
  'userId': 'userId'
};

export  const ADMIN_CLIENT_CODEC = {
  'accessToken': 'access_token',
  'refreshToken': 'refresh_token',
  'deviceId': 'device_id',
  'userId': 'user_id'
};

export const parseRedirectFragment = (fragment, ourState) => {
  // After being redirected from oauth, the URL will look like:
  // https://todo.examples.stitch.mongodb.com/#_stitch_state=...&_stitch_ua=...
  // This function parses out stitch-specific tokens from the fragment and
  // builds an object describing the result.
  const vars = fragment.split('&');
  const result = { ua: null, found: false, stateValid: false, lastError: null };
  let shouldBreak = false;
  for (let i = 0; i < vars.length; ++i) {
    const pairParts = vars[i].split('=');
    const pairKey = decodeURIComponent(pairParts[0]);
    switch (pairKey) {
    case STITCH_ERROR_KEY:
      result.lastError = decodeURIComponent(pairParts[1]);
      result.found = true;
      shouldBreak = true;
      break;
    case USER_AUTH_KEY:
      try {
        result.ua = unmarshallUserAuth(decodeURIComponent(pairParts[1]));
        result.found = true;
      } catch (e) {
        result.lastError = e;
      }
      continue;
    case STITCH_LINK_KEY:
      result.found = true;
      continue;
    case STATE_KEY:
      result.found = true;
      let theirState = decodeURIComponent(pairParts[1]);
      if (ourState && ourState === theirState) {
        result.stateValid = true;
      }
      continue;
    default: continue;
    }

    if (shouldBreak) {
      break;
    }
  }

  return result;
};

export const unmarshallUserAuth = (data) => {
  let parts = data.split('$');
  if (parts.length !== 4) {
    throw new RangeError('invalid user auth data provided: ' + data);
  }

  return {
    accessToken: parts[0],
    refreshToken: parts[1],
    userId: parts[2],
    deviceId: parts[3]
  };
};
