'use strict';

const request = require('request');

const { getCallback } = require('./util');
const { tokens } = require('../config');

const apiBase = 'https://www.googleapis.com/youtube/v3';

module.exports = {
    getVideos: (req, res) => {
        const ids = req.body.ids;
        request.get(`${apiBase}/videos?part=snippet,contentDetails&id=${ids}&key=${tokens.youtube}`, getCallback(res));
    }
};