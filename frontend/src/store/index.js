import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{ productId: 3, amount: 5 }],
    products: [],
  },

  mutations: {
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

    updateProducts(state, products) {
      state.products = products;
    },
  },

  actions: {
    loadProducts({ commit }) {
      const url = 'https://vue-study.skillbox.cc/api/products';
      axios.get(url).then(
        (response) => {
          commit('updateProducts', response.data.items);
        },
      );
    },
  },

  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: state.products.find((product) => product.id === item.productId),
      }));
    },

    cartTotalAmounts(state) {
      return state.cartProducts.reduce((count, item) => count + item.amount, 0);
    },
  },
});
