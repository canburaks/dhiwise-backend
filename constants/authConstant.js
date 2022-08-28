/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  DESKTOP_SECRET:'myjwtdesktopsecret',
  ADMIN_SECRET:'myjwtadminsecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
};

const PLATFORM = {
  DESKTOP:1,
  ADMIN:2,
};

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.DESKTOP],        
  [USER_TYPES.Admin]:[PLATFORM.DESKTOP,PLATFORM.ADMIN],        
};

const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRE_TIME: 20
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};