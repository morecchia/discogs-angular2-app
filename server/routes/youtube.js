'use strict';

const request = require('request');
const util = require('./util');
const config = require('../config');
// after node upgrade
// const { tokens } = require('../config');
const token = config.tokens.youtube;

module.exports = {
    oEmbed: (req, res) => {
        const ids = req.body.ids;
        request.get(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet&id=${ids}&key=${token}`, util.getCallback(res));
    }
};