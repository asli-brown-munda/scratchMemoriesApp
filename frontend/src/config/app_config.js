// app_config.js

const config = {
  dev: {
    backendUrl: "http://localhost:5000/api",
    googleClientId: "121036537289-qhgeejlfbbp3d177dm5l330crn1dn9ci.apps.googleusercontent.com"
  },
  prod: {
    backendUrl: "https://memoriesmvp.com/api",
    googleClientId: "121036537289-qhgeejlfbbp3d177dm5l330crn1dn9ci.apps.googleusercontent.com"
  },
};

const useProdConfig = process.env.NODE_ENV === 'production';
export const BACKEND_URL = useProdConfig ? config.prod.backendUrl : config.dev.backendUrl;
export const GOOGLE_OAUTH_CLIENT_ID = useProdConfig ? config.prod.googleClientId : config.dev.googleClientId;
