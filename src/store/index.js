import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import activity_landing_page from './modules/activity/activity_landing_page'
import order_order from './modules/activity/activity_landing_page'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showNavDrawer: null
  },
  mutations: {
    toggleNavDrawer(state) {
         state.showNavDrawer = !state.showNavDrawer;
      }
  },
  actions: {
  },
  modules: {
    auth,
    activity_landing_page,
    order_order
  }
})
