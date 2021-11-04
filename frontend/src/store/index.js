import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
// import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: null,
    userKey: null,
    preloader: false,
    orderInfo: null,
    orderId: null,
  },

  mutations: {
    preloaderChangeStatus(state, status) {
      state.preloader = status;
    },

    updateCartProducts(state, cartProducts) {
      state.cartProducts = cartProducts.map((item) => ({
        ...item,
        productId: item.product.id,
        amount: item.quantity,
        totalPrice: item.quantity * item.price,
        img: item.product.image.file.url,
      }));
    },

    updateUserKey(state, userKey) {
      state.userKey = userKey;
      localStorage.setItem('userKey', userKey);
    },

    updateOrderId(state, orderId) {
      state.orderId = orderId;
      let orders = localStorage.getItem('orders');
      orders = orders ? orders.split(',') : [];
      orders.push(orderId);
      localStorage.setItem('orders', orders);
    },

    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },

    changeAmountProduct(state, { productId, amount }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item) {
        Item.amount = +amount;
        Item.totalPrice = Item.amount * Item.price;
      }
    },

  },

  actions: {

    sendOrder(context) {
      context.commit('preloaderChangeStatus', true);
      return new Promise(((resolve) => setTimeout(resolve, 2500)))
        .then(() => (
          axios.post(`${API_BASE_URL}/orders`, {
            // ...formFields,
          }, {
            params: {
              userAccessKey: context.state.userKey,
            },
          }).then(
            (response) => {
              context.commit('updateOrderId', response.data.orderId);
            },
          ).catch(
            () => {
              // formErrors = error.request.errors;
            },
          ).then(
            () => {
              context.commit('preloaderChangeStatus', false);
            },
          )));
    },

    loadBaskets(context) {
      context.commit('preloaderChangeStatus', true);
      if ('userKey' in localStorage) {
        context.commit('updateUserKey', localStorage.getItem('userKey'));
      }
      return axios.get(`${API_BASE_URL}/baskets`, {
        params: {
          userAccessKey: context.state.userKey,
        },
      }).then(
        (response) => {
          if (!context.state.userKey) {
            context.commit('updateUserKey', response.data.user.accessKey);
          }
          context.commit('updateCartProducts', response.data.items);
        },
      ).catch(
        () => {
        },
      )
        .then(
          () => {
            context.commit('preloaderChangeStatus', false);
          },
        );
    },

    addProductToCart(context, { productId, amount }) {
      return new Promise(((resolve) => setTimeout(resolve, 2500)))
        .then(() => (
          axios.post(`${API_BASE_URL}/baskets/products`, {
            productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userKey,
            },
          }).then(
            (response) => {
              context.commit('updateCartProducts', response.data.items);
            },
          )
        ));
    },

    removeProduct(context, productId) {
      return axios.delete(`${API_BASE_URL}/baskets/products`, {
        params: {
          userAccessKey: context.state.userKey,
        },
        data: {
          productId,
        },
      }).then(
        (response) => {
          context.commit('updateCartProducts', response.data.items);
        },
      );
    },

    updateProductToCart(context, { productId, amount }) {
      return axios.put(`${API_BASE_URL}/baskets/products`, {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: context.state.userKey,
        },
      }).then(
        () => {
          context.commit('changeAmountProduct', { productId, amount });
        },
      );
    },

    loadOrder(context, orderId) {
      context.commit('preloaderChangeStatus', true);
      return axios.get(`${API_BASE_URL}/orders/${orderId}`, {
        params: {
          userAccessKey: context.state.userKey,
        },
      }).then(
        (response) => {
          context.commit('updateOrderInfo', response.data);
        },
      ).catch(
        () => {
        },
      )
        .then(
          () => {
            context.commit('preloaderChangeStatus', false);
          },
        );
    },

  },

  getters: {
    getUserKey(state) {
      return state.userKey;
    },

    preloaderActive(state) {
      return state.preloader;
    },

    cartDetailsProducts(state) {
      return state.cartProducts ? state.cartProducts : [];
    },

    cartTotalAmounts(state) {
      return state.cartProducts ? state.cartProducts.reduce((count, item) => count
        + item.amount, 0) : 0;
    },

    cartTotalSum(state) {
      return state.cartProducts ? state.cartProducts.reduce((sum, item) => sum
        + item.totalPrice, 0) : 0;
    },

    getOrderInfo(state) {
      return state.orderInfo ? state.orderInfo : {};
    },

    getAllOrders(state) {
      return ('orders' in localStorage) ? localStorage.getItem('orders').split(',') : state.orderId;
    },

  },
});
