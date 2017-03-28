'use strict';

const Rx = require('rxjs/Rx');

const { headers } = require('../config');
const { get$ } = require('../lib/request');

module.exports = {
    handleMultiple: (urls, callback) => {
        const responses = [];
        let completed_requests = 0;
        Rx.Observable.interval(300)
            .take(urls.length)
            .map(i => urls[i])
            .mergeMap(url => get$({ url, headers }))
            .subscribe(response => {
                responses.push(response.body);
                completed_requests++;
                if (completed_requests === urls.length) {
                    callback(responses);
                }
            });
    },

    discogsPageStr: req => {
        const page = isNaN(req.params.page) ? `` : `&page=${req.params.page}`;
        const perPage = isNaN(parseInt(req.query.per_page)) ? `&per_page=10` : `&per_page=${req.query.per_page}`;
        return `${page}${perPage}`;
    }
};