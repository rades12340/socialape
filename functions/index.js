const functions = require('firebase-functions')
const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signUp, login, uploadImage } = require('./handlers/users')
const FBAuth = require('./util/FBAuth')
const dotenv = require('dotenv').config()

const app = require('express')()

// Screams
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)

// Signup route
app.post('/signup', signUp)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.region('europe-west1').https.onRequest(app)
