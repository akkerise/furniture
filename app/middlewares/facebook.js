'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const passport = use('passport');
const FacebookStrategy = use('passport-facebook').Strategy;
const config = use('Config');

class FacebookAuthen {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request }, next) {
    // Passport session setup.
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

// Sử dụng FacebookStrategy cùng Passport.
    passport.use(new FacebookStrategy({
        clientID: config.get('facebook.facebook_key'),
        clientSecret:config.get('facebook.facebook_secret') ,
        callbackURL: config.get('facebook.callback_url')
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(accessToken);
        return done(null, profile);
      }
    ));
    // call next to advance the request
    await next()
  }
}

module.exports = FacebookAuthen
