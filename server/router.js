'use strict';

const request = require('request');
const config = require('./config');
const routes = require('./routes');

var Router = function(app) {
    this.start = function() {
        app.route('/api/wantlist/:page').get(routes.discogs.getWantlist);

        app.route('/api/releases/:id').get(routes.discogs.getRelease);

        app.route('/api/collection/:page').get(routes.discogs.getCollection);

        app.route('/api/inventory/:page').get(routes.discogs.getInventory);

        app.route('/api/listing/:id').get(routes.discogs.getListing);

        app.route('/api/oEmbed').post(routes.youtube.oEmbed);
    };
};

module.exports = Router;