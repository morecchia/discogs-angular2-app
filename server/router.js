const request = require('request');

const apiBase = 'https://api.discogs.com';
const token = 'dkNuuUEtAEjdSyZiTLTplyGLIbYFujOZJgvMrYLH';
const headers = {
    'Accept': 'application/vnd.discogs.v2.plaintext+json',
    'User-Agent': 'TestDiscogClient/0.1 +http://tonefolder.com'
};

var Router = function(app) {
    this.start = function() {
        app.route('/api/wantlist').get((req, res) => {
            const options = {
                url: `${apiBase}/users/bedhed3000/wants?sort=added&sort_order=desc&token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/releases/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/releases/${id}?token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/artists/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/artists/${id}?token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/labels/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/labels/${id}?token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/collection').get((req, res) => {
            const options = {
                url: `${apiBase}/users/bedhed3000/collection/folders/0/releases?sort=added&sort_order=desc&token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/inventory').get((req, res) => {
            const options = {
                url: `${apiBase}/users/bedhed3000/inventory?sort=listed&sort_order=desc&token=${token}`,
                headers: headers
            };
            request.get(options, getCallback(res));
        });

        app.route('/api/listing/:id').get((req, res) => {
            const id = req.params.id;
            const options = {
                url: `${apiBase}/marketplace/listings/${id}?curr_abbr=USD&token=${token}`,
                headers: headers
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