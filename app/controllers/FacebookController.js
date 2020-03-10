'use strict'
const BaseController = use('App/Controllers/Http/BaseController');
const passport = use('passport');
var OAuth2 = require("oauth").OAuth2;
const config = use('Config');

var oauth2 = new OAuth2(config.get('facebook.facebook_key'),
  config.get('facebook.facebook_secret'),
  "", "https://www.facebook.com/dialog/oauth",
  "https://graph.facebook.com/oauth/access_token",
  null);

class LoginFacebookController extends BaseController{
  index({ request, session, view }){
    return view.render('pages.auth.facebook')
  }

  login({ request, session, view, response }){

    var redirect_uri = "http://localhost:3333/auth/facebook/callback";
    var params = {'redirect_uri': redirect_uri, 'scope':'email,user_friends,user_photos'};
    let rs = oauth2.getAuthorizeUrl(params);
    console.log(rs);
    response.redirect(rs);
  }

  callback({ request, session, view }){
    if (request.input('code')) {
      var loginCode = request.get().code;
      var redirect_uri = 'http://localhost:3333/auth/facebook/callback'; // Path_To_Be_Redirected_to_After_Verification
      // For eg. "/facebook/callback"
      oauth2.getOAuthAccessToken(loginCode,
        { grant_type: 'authorization_code',
          redirect_uri: redirect_uri},
        function(err, accessToken, refreshToken, params){
          if (err) {
            console.error(err);
          }
          console.log(accessToken);
          console.log(refreshToken);
          console.log(params);
        }
      );
  }

}
}

module.exports = LoginFacebookController
