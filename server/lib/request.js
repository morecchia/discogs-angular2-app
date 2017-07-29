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
    let responseBody = null;
    try {
      responseBody = JSON.parse(body);
    } catch (ex) {
      responseBody = { message: 'An unknown error occured' };
    }

    if (statusCode !== status) {
      observer.next({ statusCode, body: responseBody });
      observer.complete();
      return;
    }

    observer.next({ statusCode: status, body: responseBody });
    observer.complete();
  };
}