'use strict'

/* Middleware */
class PublicPage {
  async handle({ request, session, response }, next) {
    const token = session.get('user');
    if (token) {
      response.redirect('/');
    }

    await next()
  }
}

module.exports = PublicPage
