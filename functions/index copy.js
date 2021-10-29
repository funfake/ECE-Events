// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  // Check if user meets role criteria.
  if (user.email) {
    const customClaims = {
      member: true,
      admin: false,
      staff: false,
    };

    try {
      // Set custom user claims on this newly created user.
      admin.auth().setCustomUserClaims(user.uid, customClaims).then(() => {
        db.collection("metadata").doc(user.uid).set({
          email: user.email,
          role: customClaims,
          refreshTime: new Date().getTime()
        })
      });
    } catch (error) {
      console.log(error);
    }
  }
});