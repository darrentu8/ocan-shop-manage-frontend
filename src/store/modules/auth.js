//import axios from "axios";
//import API from "@/api/index";
const auth = {
  namespaced: true,
  state: {
    userdata: {token:null,user:""},
  },
  mutations: {
    login(state, payload) {
      state.userdata = payload;
    },
    logout(state) {
      state.userdata = {token:null}
    },
  },
  actions: {
    authenticate({ commit }, { email, password }) {
      //test
      console.log("email:",email,"password:", password);
      commit("login", { token: "1234689", user: "george" });
      

      

      // axios
      //   .post(API.AUTH.LOGIN, {
      //     username: username,
      //     password: password,
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //     if (response.status === 200) {
      //       commit("login", response.data);
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

      
      
    },
  },
  getters: {
    loggedIn(state) {
      return state.userdata !== null;
    },
  },
};
export default auth;
/*
// State
this.$store.state.auth.userdata
// Mutation
this.$store.commit('auth/login', { username: 'logged_user' })
// Action
this.$store.dispatch('auth/authenticate', { username: this.username, password: this.password })
// Getter
this.$store.getters['auth/loggedIn']
*/
