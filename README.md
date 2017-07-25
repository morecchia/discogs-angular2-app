# discogs-angular2-app

This is an example of a single-page-application written in Angular 2 (using ngrx-store).  You can browse your collection, wantlist, sales items, search, and listen to any youtube videos associated with the releases.

The player should automatically advance to the next video once a track ends, continuously advancing until the end of the list.  You can also create playlists.


## Development server

Generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.


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
           'User-Agent': 'MyDiscogsClient/1.0 +http://mydiscogsclient.org' // your User-Agent string here
       }
   };
   ```
2. Run `npm install` and `npm start` in both the root and `server` directories to run a dev server.
3. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

