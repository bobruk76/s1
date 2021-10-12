import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 3, amount: 5 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const Item = state.cartProducts.find((item) => item.productId === productId);
      if (Item) {
        Item.amount += amount;
      } else {
        state.cartProducts.push(productId, amount);
      }
    },
  },

  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
  },
});
