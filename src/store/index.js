import { createStore } from "vuex";
import { projectFirestore } from "@/firebase/config";

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        var admin, member, staff = false;
        var team = "";

        var userRole = projectFirestore.collection("roles").doc(user.uid);

        user.getIdTokenResult()
        .then((idTokenResult) => {
          // Confirm the user is an Admin.
          console.log(idTokenResult);
          member = !!idTokenResult.claims.member;
          admin = !!idTokenResult.claims.admin;
          staff = !!idTokenResult.claims.staff;
          team = idTokenResult.claims.team;

          commit("SET_USER", {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            admin: admin,
            member: member,
            staff: staff,
            team : team
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        commit("SET_USER", null);
      }
    },
  },
});

export default store;
