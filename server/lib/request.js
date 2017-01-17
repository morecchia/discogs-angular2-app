const request = require('request');
const Rx = require('rxjs/Rx');

module.exports = {
    get$: options => {
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
    },

    put$: options => {
        return new Rx.Observable(observer => {
            request.put(options.url, { headers: options.headers },
                (error, response, body) => {
                    if (error) {
                        observer.error(error);
                        return;
                    }

                    const statusCode = response.statusCode;
                    if (statusCode !== 201) {
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