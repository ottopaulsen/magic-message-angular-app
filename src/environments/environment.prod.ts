// THIS IS AN EXAMPLE FILE
// You need an environment.ts and an environment.prod.ts file similar to this, to get going.
// Copy the content of the fire object from your firebase console.

export const environment = {
  production: true, // Set to true in the prod file

  // magicServerUrl: 'http://localhost:8000',
  magicServerUrl: 'https://us-central1-magic-acf51.cloudfunctions.net/app',

  fire: {
        apiKey: 'AIzaSyA_PsBPYYqDg203bHfUmZPEDUxgbBtFPkY',
        authDomain: 'magic-acf51.firebaseapp.com',
        databaseURL: 'https://magic-acf51.firebaseio.com',
        projectId: 'magic-acf51',
        storageBucket: 'magic-acf51.appspot.com',
        messagingSenderId: '4501297937'
  }

};
