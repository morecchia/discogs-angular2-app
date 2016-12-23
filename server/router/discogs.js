'use strict';

const request = require('request');

const util = require('./util');
const config = require('../config');
const { tokens, username, headers } = require('../config');

const apiBase = 'https://api.discogs.com';

module.exports = {
    getWantlist: (req, res) => {
        const pageStr = generatePageStr(req);
        request.get({
            url: `${apiBase}/users/${username}/wants?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`,
            headers: headers
        }, util.getCallback(res));
    },

    getCollection: (req, res) => {
        const pageStr = generatePageStr(req);
        request.get({
            url: `${apiBase}/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc${pageStr}&token=${tokens.discogs}`,
            headers: headers
        }, util.getCallback(res));
    },

    getInventory: (req, res) => {
        const pageStr = generatePageStr(req);
        request.get({
            url: `${apiBase}/users/${username}/inventory?sort=listed&sort_order=desc${pageStr}&token=${tokens.discogs}`,
            headers: headers
        }, util.getCallback(res));
    },

    getRelease: (req, res) => {
        const id = req.params.id;
        request.get({
            url: `${apiBase}/releases/${id}?token=${tokens.discogs}`,
            headers: headers
        }, util.getCallback(res));
    },

    getListing: (req, res) => {
        const id = req.params.id;
        request.get({
            url: `${apiBase}/marketplace/listings/${id}?curr_abbr=USD&token=${tokens.discogs}`,
            headers: headers
        }, util.getCallback(res));
    }
};

function generatePageStr(req) {
    const page = isNaN(req.params.page) ? `` : `&page=${req.params.page}`;
    const perPage = isNaN(parseInt(req.query.per_page)) ? `&per_page=10` : `&per_page=${req.query.per_page}`;
    return `${page}${perPage}`;
}