'use strict';

const request = require('request');

const { getCallback, discogsPageStr } = require('./util');
const { tokens, username, headers } = require('../config');

const apiBase = 'https://api.discogs.com';

module.exports = {
    getUser: (req, res) => {
        getRequest(`${apiBase}/users/${username}`, res);
    },

    getWantlist: (req, res) => {
        const pageStr = discogsPageStr(req);
        getRequest(`${apiBase}/users/${username}/wants?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
    },

    getCollection: (req, res) => {
        const pageStr = discogsPageStr(req);
        getRequest(`${apiBase}/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
    },

    getInventory: (req, res) => {
        const pageStr = discogsPageStr(req);
        getRequest(`${apiBase}/users/${username}/inventory?status=${encodeURIComponent('For Sale')}&sort=listed&sort_order=desc${pageStr}&token=${tokens.discogs}`, res);
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
        request.put(`${apiBase}/users/${username}/wants/${id}?token=${tokens.discogs}`, {headers: headers}, 
            (error, response, body) => {
                if (error) {
                    res.status(500).send(error);
                    return;
                }

                const statusCode = response.statusCode;
                if (statusCode !== 201) {
                    res.status(statusCode).send(response);
                    return;
                }

                res.status(201).send(body);
            });
    }
};

function getRequest(url, res) {
    request.get({ url: url, headers: headers }, getCallback(res));
}