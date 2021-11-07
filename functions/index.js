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

exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.admin) return

  try {
    var customClaims = {
      member: false,
      staff: false,
      admin: false,
    };

    if (data.role == "member") {
      customClaims = {
        member: true,
        staff: false,
        admin: false,
      }
    } else if (data.role == "staff") {
      customClaims = {
        member: true,
        staff: true,
        admin: false,
      }
    } else if (data.role == "admin") {
      customClaims = {
        member: true,
        staff: true,
        admin: true,
      }
    }

    var _ = await admin.auth().setCustomUserClaims(data.uid, customClaims)

    return db.collection("roles").doc(data.uid).update({
      role: customClaims,
      refreshTime: new Date().getTime()
    })

  } catch (error) {
    console.log(error)
  }

});