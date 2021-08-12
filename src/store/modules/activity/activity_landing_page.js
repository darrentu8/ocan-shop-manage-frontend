import axios from "axios";
import API from "@/api/index";
const activity_landing_page = {
  namespaced: true,
  state: {
    data: null,
  },
  mutations: {
    getData(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    getData({ commit }) {
      axios
        .post(API.activity_landing_page.getData)
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            commit("getData", response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updatData({ commit },{id}){
        axios
        .post(API.activity_landing_page.getData,{id:id})
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            commit("getData", response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  getters: {
    loggedIn(state) {
      return state.userdata !== null;
    },
  },
};
export default activity_landing_page;

