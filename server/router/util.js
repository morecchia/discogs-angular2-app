'use strict';

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

    handleMultiple: (urls, res) => {
        const resArray = [];
        const len = urls.length;
        for (let i = 0; i < len; i++) {
            request.get(urls[i], (error, response, body) => {
                resArray.push(JSON.parse(body));
                if (i + 1 === len) {
                    res.send(resArray);
                }
            });
        }
    }
};