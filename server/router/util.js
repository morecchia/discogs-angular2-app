'use strict';
const { headers } = require('../config');
const request = require('request');

module.exports = {
    getCallback: res => {
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
    },

    handleMultiple: (urls, callback) => {
        const responseData = [];
        const len = urls.length;

        let completed_requests = 0;
        urls.forEach(url => {
            setTimeout(() => {
                request.get({ url: url, headers: headers }, (error, response, body) => {
                    if (error) {
                        callback(error);
                        return;
                    }
                    responseData.push(JSON.parse(body));
                    completed_requests++;
                    if (completed_requests === len) {
                        console.log(`completed: ${completed_requests} out of ${len}`);
                        callback(responseData);
                    }
                });
            }, 200);
        });
    },

    discogsPageStr: req => {
        const page = isNaN(req.params.page) ? `` : `&page=${req.params.page}`;
        const perPage = isNaN(parseInt(req.query.per_page)) ? `&per_page=10` : `&per_page=${req.query.per_page}`;
        return `${page}${perPage}`;
    }
};