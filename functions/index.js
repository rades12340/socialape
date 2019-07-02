const functions = require('firebase-functions')
const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signUp, login, uploadImage } = require('./handlers/users')
const FBAuth = require('./util/FBAuth')
const dotenv = require('dotenv').config()

const app = require('express')()

<<<<<<< HEAD
// Screams
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
=======
// console.log(process.env.CONFIG_FIREBASE)

const firebaseConfig = {//COnfig files}
  

const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)

const db = admin.firestore()

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      const screams = []
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: new Date().toISOString()
        })
      })

      return res.json(screams)
    })
    .catch(err => console.log(err))
})

const FBAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    console.error('No token found')
    return res.status(403).json({ error: 'Unauthorized' })
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken

      return (
        db
          .collection('users')
          .where('userId', '==', req.user.uid)
          .limit(1)
          .get()
      )
    })
    .then(data => {
      req.user.handle = data.docs[0].data().handle
      return next()
    })
    .catch(err => {
      console.error('Error while verifying token', err)
      return res.status(403).json(err)
    })
}

app.post('/scream', FBAuth, (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  }

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `Document ${doc.id} created successfully` })
    })
    .catch(err => {
      res.status(500).json({ error: 'Something went wrong' })
      console.log(err)
    })
})

const isEmpty = string => {
  if (string.trim() === '') return true
  else return false
}

const isEmail = email => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (email.match(emailRegEx)) return true
  else return false
}
>>>>>>> 56f9df2647b72b84ad2d6741e6461f7fbb8250de

// Signup route
app.post('/signup', signUp)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)

exports.api = functions.region('europe-west1').https.onRequest(app)
