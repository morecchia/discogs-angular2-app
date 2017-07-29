'use strict';

const url = require('url');
const Discogs = require('disconnect').Client;
const { auth } = require('../data');

const { tokens, headers } = require('../config');

const callbackUrl = 'http://localhost:4200/api/oauth/access_token'

module.exports = {
  requestToken: (req, res) => {
    const oAuth = new Discogs(headers['User-Agent']).oauth();
    getRequestToken(res);
  },

  accessToken: (req, res) => {
    auth.findOne({token: req.query.oauth_token}, (err, result) => {
      const oAuth = new Discogs(result).oauth();
      getAccessToken(res, result, req.query.oauth_verifier)
    });
  },

  authTest: (req, res) => {
    auth.all((err, docs) => {
      res.send(docs);
    });
  }
};

function getRequestToken() {
  const { consumerKey, consumerSecret } = tokens.oauth;
  oAuth.getRequestToken(consumerKey, consumerSecret, callbackUrl,
    (err, requestData) => {
      auth.insert(requestData, (err, item) => {
        if (err) {
          throw new Error(err);
        }
        res.send({authorizeUrl: requestData.authorizeUrl});
      });
    });
}

function getAccessToken(res, result, oauth_verifier) {
  oAuth.getAccessToken(oauth_verifier, (err, accessData) => {
    if (err) {
      throw new Error(err);
    }
    redirectWithIdentity(res, result, accessData);
  });
}

function redirectWithIdentity(res, result, accessData) {
  const discogs = new Discogs(accessData);
  discogs.getIdentity((err, data) => {
    const username = data.username;
    auth.update({_id: result._id}, {username, accessData});    
    res.redirect(url.format({pathname: '/', query: {username}}));
  });
}