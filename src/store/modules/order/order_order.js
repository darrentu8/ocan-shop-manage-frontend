import axios from "axios";
import API from "@/api/index";
const order_order = {
  namespaced: true,
  state: {
    orderListData: null,
    orderData: null,
  },
  mutations: {
    setOrderListData(state, payload) {
      state.orderListData = payload;
    },
    setOrderData(state, payload) {
      state.orderData = payload;
    },
  },
  actions: {
    getOrderListData({ commit }) {
      axios
        .post(API.ORDER_ORDER.GET_ORDER_LIST)
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            commit("setOrderListData", response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getOrderData({ commit }, { id }) {
      axios
        .post(API.order_order.getData, { id: id })
        .then(function(response) {
          console.log(response);
          if (response.status === 200) {
            commit("setOrderData", response.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
  getters: {
    loggedIn(state) {
      return state.userdata !== null;
    },
  },
};
export default order_order;

/*
// State
this.$store.state.order_order.orderListData
this.$store.state.order_order.orderData

// Mutation
this.$store.commit('order_order/setOrderListData')
this.$store.commit('order_order/setOrderData')

// Action
this.$store.commit('order_order/getOrderListData')
this.$store.dispatch('order_order/getOrderData', { id: this.id})

*/
