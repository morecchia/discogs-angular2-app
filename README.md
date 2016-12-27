# discogs-angular2-app

This is an example of a single-page-application written in Angular 2.


Generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.

## Development server
1. Create a `config.js` file in the server directory.

   Here is a sample `config.js` file (*the token values below are just examples and will not work*):
   
   ```
   module.exports = {
       tokens: {
           discogs: 'oqaAXuZXnvUvEVGVXdiEMiWfDPJgeQsEEamPzYbJ', // your discogs API token here
           youtube: 'AIzaSyCQ9K1_OA2Fjm834u4uL1H9KG44aM4zabI' // your youtube data API token here
       },
       headers: {
           'Accept': 'application/vnd.discogs.v2.html+json',
           'User-Agent': 'MyDiscogsClient/1.0 +http://mydiscogsclient.org' // your custom User Agent string here
       },
       username: 'discogsUser' // your discogs username here
   };
   ```
2. Run `npm install` and `npm start` in both the root and `server` directories to run a dev server.
3. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

