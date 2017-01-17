const request = require('request');
const Rx = require('rxjs/Rx');

module.exports = {
    getJSON$: options => {
        return new Rx.Observable(observer => {
            request.get(options, (error, response, body) => {
                if (error) {
                    observer.error(error);
                }

                const statusCode = response.statusCode;
                if (statusCode !== 200) {
                    observer.next({ statusCode, body: JSON.parse(body) });
                    observer.complete();
                    return;
                }

                observer.next(JSON.parse(body));
                observer.complete();
            });
        });
    }
};