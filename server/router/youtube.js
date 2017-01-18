'use strict';

const { get$ } = require('../lib/request');

const { tokens } = require('../config');

const apiBase = 'https://www.googleapis.com/youtube/v3';

module.exports = {
    getVideos: (req, res) => {
        const ids = req.body.ids;
        const url = `${apiBase}/videos?part=snippet,contentDetails&id=${ids}&key=${tokens.youtube}`;

        get$({ url })
            .subscribe(response => {
                res.send(response);
            });
    }
};