const request = require('request');
const config = require('./config');

const apiBase = 'https://api.discogs.com';

var Router = function(app) {
    this.start = function() {
        app.route('/api/wantlist/:page').get((req, res) => {
            const page = req.params.page;
            const options = {
                url: `${apiBase}/users/${config.username}/wants?sort=added&sort_order=desc&page=${page}&per_page=25&token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/releases/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/releases/${id}?token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/artists/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/artists/${id}?token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/labels/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/labels/${id}?token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/collection/:page').get((req, res) => {
            const page = req.params.page;
            const options = {
                url: `${apiBase}/users/${config.username}/collection/folders/0/releases?sort=added&sort_order=desc&page=${page}&per_page=25&token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/inventory/:page').get((req, res) => {
            const page = req.params.page;
            const options = {
                url: `${apiBase}/users/${config.username}/inventory?sort=listed&sort_order=desc&page=${page}&per_page=25&token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/listing/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/marketplace/listings/${id}?curr_abbr=USD&token=${config.token}`,
                headers: config.headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/oEmbed').post((req, res) => {
            const url = req.body.url;
            request.get(`http://youtube.com/oembed?url=${url}&format=json&maxwidth=240&maxheight=220`, getCallback(res));
        });
    };
};

function getCallback(res) {
    return (error, response, body) => {
        if (error) {
            res.status(500).send(error);
            return;
        }

        const statusCode = response.statusCode;
        if (statusCode !== 200) {
            res.status(statusCode).send(response);
            return;
        }

        res.send(body);
    };
}

module.exports = Router;