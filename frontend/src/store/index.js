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

  getters: {
    cartDetailsProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      }));
    },
  },
});
