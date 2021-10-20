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

    removeProduct(state, { productId }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      const index = state.cartProducts.indexOf(Item);
      state.cartProducts.splice(index, 1);
    },

    incrementProduct(state, productId) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      Item.amount = +Item.amount + 1;
      Item.totalPrice = Item.amount * Item.price;
    },

    decrementProduct(state, productId) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item.amount > 1) {
        Item.amount = +Item.amount - 1;
        Item.totalPrice = Item.amount * Item.price;
      }
    },

    changeAmountProduct(state, { productId, amount }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item) {
        Item.amount = amount;
        Item.totalPrice = Item.amount * Item.price;
      }
    },

  },

  actions: {
    loadBaskets(context) {
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

  },

  getters: {
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
  },
});
