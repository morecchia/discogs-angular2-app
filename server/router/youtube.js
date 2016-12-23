'use strict';

const request = require('request');

const util = require('./util');
const config = require('../config');
const { tokens } = require('../config');

const apiBase = 'https://www.googleapis.com/youtube/v3';

module.exports = {
    getVideos: (req, res) => {
        const ids = req.body.ids;
        request.get(`${apiBase}/videos?part=id,snippet&id=${ids}&key=${tokens.youtube}`, util.getCallback(res));
    }
};