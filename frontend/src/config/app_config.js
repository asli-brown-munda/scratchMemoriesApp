// app_config.js

const config = {
  dev: {
    backendUrl: "http://127.0.0.1:5000",
    googleClientId: "121036537289-qhgeejlfbbp3d177dm5l330crn1dn9ci.apps.googleusercontent.com"
  },
  prod: {
    backendUrl: "undefined in app_config.js",
    googleClientId: "undefined"
  },
};

const useProdConfig = false;

export const BACKEND_URL = useProdConfig ? config.prod.backendUrl : config.dev.backendUrl;
export const GOOGLE_OAUTH_CLIENT_ID = useProdConfig ? config.prod.googleClientId : config.dev.googleClientId;