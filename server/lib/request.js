const request = require('request');
const Rx = require('rxjs/Rx');

module.exports = {
    get$: options => {
        return new Rx.Observable(observer => {
            request.get({ url: options.url, headers: options.headers },
                _obvservableCallback(observer));
        });
    },

    put$: options => {
        return new Rx.Observable(observer => {
            request.put(options.url, { headers: options.headers },
                _obvservableCallback(observer, 201));
        });
    },

    delete$: options => {
        return new Rx.Observable(observer => {
            request.delete(options.url, { headers: options.headers },
                _obvservableCallback(observer, 204));
        });
    }
};

function _obvservableCallback(observer, status = 200) {
    return (error, response, body) => {
        if (error) {
            observer.error(error);
            return;
        }

        const statusCode = response.statusCode;
        if (statusCode !== status) {
            observer.next({ statusCode, body: JSON.parse(body) });
            observer.complete();
            return;
        }

        const responseBody = body ? JSON.parse(body) : null;

        observer.next({ statusCode: status, body: responseBody });
        observer.complete();
    };
}