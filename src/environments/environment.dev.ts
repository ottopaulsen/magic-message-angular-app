// THIS IS AN EXAMPLE FILE
// You need an environment.ts and an environment.prod.ts file similar to this, to get going.
// Copy the content of the fire object from your firebase console.

export const environment = {
  production: false, // Set to true in the prod file

  // magicServerUrl: 'http://localhost:8000',
  magicServerUrl: 'http://localhost:5000/magic-acf51/us-central1/app',

  fire: {
        apiKey: 'AIzaSyDWvDhptPNitpBoamfGT39p76eQrsLeNUs',
        authDomain: 'magic-acf51.firebaseapp.com',
        databaseURL: 'https://magic-acf51.firebaseio.com',
        projectId: 'magic-acf51',
        storageBucket: 'magic-acf51.appspot.com',
        messagingSenderId: '4501297937'
  }

};
