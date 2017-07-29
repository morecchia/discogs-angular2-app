'use strict';

const Rx = require('rxjs/Rx');

const { get$, put$, delete$ } = require('../lib/request');
const { tokens, headers } = require('../config');
const { discogsPageStr, handleMultiple } = require('./util');
const { auth } = require('../data');

const apiBase = 'https://api.discogs.com';

module.exports = {
  getUser: (req, res) => {
    const username = req.params.username;
    auth.findOne({username: username}, (err, result) => {
      if (!result) {
        res.status(401);
        return res.send({message: `Could not find a user with the name ${username}`});
      }
      getRequest(`${apiBase}/users/${username}`, res);
    });
  },

  getWantlistIds: (req, res) => {
    const wantCount = req.query.want_count;
    const pages = Math.ceil(wantCount / 100);
    const urls = [];

    for (let i = 0; i < pages; i++) {
      let page = i + 1;
      urls.push(`${apiBase}/users/${req.params.username}/wants?sort=added&sort_order=desc&page=${page}&per_page=100`);
    }
    handleMultiple(urls, response => {
      if (response.error) {
        res.status(500);
        return res.send(error);

      }

      // transform the response to an array of ids
      const flatResponse = response
        .map(d => d.wants)
        .reduce((a, b) => a && a.concat(b));

      const ids = flatResponse && flatResponse.map(w => w && w.id);

      res.send({
        lastUpdated: Date.now(),
        count: (ids && ids.length || 0),
        ids: ids || []
      });
    });
  },

  getWantlist: (req, res) => {
    const pageStr = discogsPageStr(req);
    getRequest(`${apiBase}/users/${req.params.username}/wants?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
  },

  getCollection: (req, res) => {
    const pageStr = discogsPageStr(req);
    getRequest(`${apiBase}/users/${req.params.username}/collection/folders/0/releases?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
  },

  getInventory: (req, res) => {
    const pageStr = discogsPageStr(req);
    getRequest(`${apiBase}/users/${req.params.username}/inventory?status=${encodeURIComponent('For Sale')}&sort=listed&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
  },

  searchReleases: (req, res) => {
    const pageStr = discogsPageStr(req);
    getRequest(`${apiBase}/database/search?q=${req.params.q}&type=release${pageStr}&token=${tokens.discogs}`, res);
  },

  getRelease: (req, res) => {
    const id = req.params.id;
    getRequest(`${apiBase}/releases/${id}?token=${tokens.discogs}`, res);
  },

  getListing: (req, res) => {
    const id = req.params.id;
    getRequest(`${apiBase}/marketplace/listings/${id}?curr_abbr=USD&token=${tokens.discogs}`, res);
  },

  putWantlist: (req, res) => {
    const id = req.params.id;
    const url = `${apiBase}/users/${req.params.username}/wants/${id}?token=${tokens.discogs}`;

    put$({ url, headers })
      .catch(err => Rx.Observable.throw(err))
      .subscribe(response => {
        res.status(response.statusCode).send(response.body);
      });
  },

  deleteWantlist: (req, res) => {
    const id = req.params.id;
    const url = `${apiBase}/users/${req.params.username}/wants/${id}?token=${tokens.discogs}`;
    delete$({ url, headers })
      .catch(err => Rx.Observable.throw(err))
      .subscribe(response => {
        res.status(response.statusCode).send(response.body);
      });
  },
  authTest: (req, res) => {
    auth.all((err, docs) => {
      res.send(docs);
    });
  }
};

function getRequest(url, res) {
  get$({ url, headers })
    .catch(err => Rx.Observable.throw(err))
    .subscribe(response => {
      res.status(response.statusCode);
      res.send(response.body);
    });
}
