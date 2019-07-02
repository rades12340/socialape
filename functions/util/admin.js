const admin = require('firebase-admin')
const serviceAccount = require('../../socialape.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://socialape-b13e5.firebaseio.com',
  storageBucket: 'socialape-b13e5.appspot.com'
})

const db = admin.firestore()

module.exports = { admin, db }
