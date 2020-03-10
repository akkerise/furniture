"use strict";
const Google = use('App/Cores/Google')
const GoogleApis = use('App/Cores/GoogleApis')
const _ = require('lodash')

class GoogleController {

  constructor() {
    this.googleApis = new GoogleApis
  }

  index({ view }) {
    const googleLoginUrl = this.googleApis.googleAuthUrl;
    return view.render("pages.auth.login", {googleLoginUrl});
  }

  async callback({ request, response, session }) {
    const {code} = request.get('code');
    if (!_.isEmpty(code)) {
    /* GoogleApis */
      await this.googleApis.initTokens(code);
      await this.googleApis.getUserInfo();
      return response.json({user: this.googleApis.user})
    }
    return response.json({result: false})

  }
}

module.exports = GoogleController;
