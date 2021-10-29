const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.processSignUp = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      member: true,
      staff: false,
      admin: false,
    };

    try {
      admin.auth().setCustomUserClaims(authUser.uid, customClaims).then(() => {
        db.collection("roles").doc(authUser.uid).set({
          email: authUser.email,
          role: customClaims,
          refreshTime: new Date().getTime()
        })
      });
    } catch (error) {
      console.log(error)
    }

  }

});