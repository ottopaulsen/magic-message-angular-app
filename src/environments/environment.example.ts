// THIS IS AN EXAMPLE FILE
// You need an environment.ts and an environment.prod.ts file similar to this, to get going.
// Copy the content of the fire object from your firebase console.

export const environment = {
  production: false, // Set to true in the prod file

  // magicServerUrl: 'http://localhost:8000',
  magicServerUrl: 'https://serveraddress.cloudfunctions.net/app',

  fire: {
    apiKey: 'api_key',
    authDomain: 'projectid.firebaseapp.com',
    databaseURL: 'https://projectid.firebaseio.com',
    projectId: 'projectid',
    storageBucket: 'projectid.appspot.com',
    messagingSenderId: 'sender_id'
  }

};
