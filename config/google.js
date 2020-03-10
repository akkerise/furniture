"use strict";

const googleConfig = {
  client_id: "1017997489416-87kvhgpd5d76rk8rq2k2aeln1l8o92ra.apps.googleusercontent.com",
  client_secret: "kaz0l77GHA6BnBjP8Y2dox0J",
  redirect_uri: "https://f2386fd2.ngrok.io/auth/google/callback"
};

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  // 'https://www.googleapis.com/auth/calendar',
];

module.exports = {
  googleConfig,
  scope
};
