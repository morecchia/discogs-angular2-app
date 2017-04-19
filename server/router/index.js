'use strict';

const request = require('request');

const config = require('../config');
const youtube = require('./youtube');
const discogs = require('./discogs');

var Router = function(app) {
    this.start = function() {
        app.route('/').get((req,res) => {
            res.render('index.html');
        });

        app.route('/api/user/:username').get(discogs.getUser);

        app.route('/api/collection/:username/:page?').get(discogs.getCollection);

        app.route('/api/wantlistids/:username').get(discogs.getWantlistIds);

        app.route('/api/wantlist/:username/:page?').get(discogs.getWantlist);

        app.route('/api/wantlist/:username/:id').put(discogs.putWantlist);

        app.route('/api/wantlist/:username/:id').delete(discogs.deleteWantlist);

        app.route('/api/inventory/:username/:page?').get(discogs.getInventory);

        app.route('/api/search/releases/:q/:page?').get(discogs.searchReleases);

        app.route('/api/releases/:id').get(discogs.getRelease);

        app.route('/api/listing/:id').get(discogs.getListing);

        app.route('/api/videos').post(youtube.getVideos);
    };
};

module.exports = Router;