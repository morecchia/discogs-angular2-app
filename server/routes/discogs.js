'use strict';

const request = require('request');
const util = require('./util');
const config = require('../config');
// after node upgrade
// const { tokens, username, headers } = require('../config');
const apiBase = 'https://api.discogs.com';
const token = config.tokens.discogs;

module.exports = {
    getWantlist: (req, res) => {
        const page = req.params.page;
        const options = {
            url: `${apiBase}/users/${config.username}/wants?sort=added&sort_order=desc&page=${page}&per_page=25&token=${token}`,
            headers: config.headers
        };

        request.get(options, util.getCallback(res));
    },

    getCollection: (req, res) => {
        const page = req.params.page;
        const options = {
            url: `${apiBase}/users/${config.username}/collection/folders/0/releases?sort=added&sort_order=desc&page=${page}&per_page=25&token=${token}`,
            headers: config.headers
        };

        request.get(options, util.getCallback(res));
    },

    getRelease: (req, res) => {
        const id = req.params.id;
        const options = {
            url: `${apiBase}/releases/${id}?token=${token}`,
            headers: config.headers
        };

        request.get(options, util.getCallback(res));
    },

    getInventory: (req, res) => {
        const page = req.params.page;
        const options = {
            url: `${apiBase}/users/${config.username}/inventory?sort=listed&sort_order=desc&page=${page}&per_page=25&token=${token}`,
            headers: config.headers
        };

        request.get(options, util.getCallback(res));
    },

    getListing: (req, res) => {
        const id = req.params.id;
        const options = {
            url: `${apiBase}/marketplace/listings/${id}?curr_abbr=USD&token=${token}`,
            headers: config.headers
        };

        request.get(options, util.getCallback(res));
    }
};