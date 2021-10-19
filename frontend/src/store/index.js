import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
// import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: null,
    products: [],
    userKey: null,
  },

  mutations: {
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
    },

    removeProduct(state, { productId }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      const index = state.cartProducts.indexOf(Item);
      state.cartProducts.splice(index, 1);
    },

    incrementProduct(state, productId) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      Item.amount += 1;
    },

    decrementProduct(state, productId) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item.amount > 1) {
        Item.amount -= 1;
      }
    },

    addProductToCart(state, { productId, amount }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item) {
        Item.amount += amount;
      } else {
        state.cartProducts.push({ productId, amount });
      }
    },

    changeAmountProduct(state, { productId, amount }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item) {
        Item.amount = amount;
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
          // context.commit('syncCartProducts', response.data.items);
        },
      );
    },
  },

  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts;
    },

    cartTotalAmounts(state) {
      return state.cartProducts.reduce((count, item) => count + item.amount, 0);
    },

    cartTotalSum(state) {
      return state.cartProducts.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
});
