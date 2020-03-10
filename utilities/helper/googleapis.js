'use strict';
const { google } = require('googleapis')
const { googleConfig, scope } = require('../../config/google.js');
const axios = require('axios')

class GoogleApis {

  constructor() {
    this.client = new google.auth.OAuth2(...Object.values(googleConfig));
    this.tokens = {
      access_token: null,
      refresh_token: null,
      token_type: null,
      scope: [],
      id_token: null,
      expiry_date: null,
    };
    this.user = {
      id: null,
      email: null,
      verified_email: false,
      name: null,
      given_name: null,
      family_name: null,
      picture: null,
      locale: "en",
      hd: null
    };
    this.config = { scope, access_type: 'offline' };
    this.generateAuthUrl();
  }

  async initTokens(code) {
    const { tokens } = await this.client.getToken(code);
    this.client.setCredentials(tokens);
    this.tokens = {...this.tokens, ...tokens};
  }

  async generateAuthUrl() {
    this.googleAuthUrl = this.client.generateAuthUrl(this.config)
  }

  // Use refresh_token re-authentication
  async refreshSetTokens() {
     await this.client.on('tokens', (tokens) => {
      if (tokens.refresh_token) {
        //Store the refresh_token in database
        console.log(tokens.refresh_token);
      }
      this.tokens = { ...this.tokens, ...tokens };
      // Use access_token
      this.client.setCredentials(tokens);
    })
  }

  // Set refresh_token at a later time
  async setRefreshToken() {
    const refresh_token = this.tokens.access_token;
    await this.client.setCredentials({refresh_token});
  }

  async getUserInfo() {
    const { data } = await axios({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.tokens.access_token}`,
      },
    });
    this.user = { ...this.user, ...data };
  }

  /**
   * @tokenInfo
   */
  async getTokenInfo() {
    const tokenInfo = await this.client.getTokenInfo(this.tokens.access_token);
    return tokenInfo;
  }
}
module.exports = GoogleApis
