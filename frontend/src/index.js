import products from './data/products';
import ProductList from './components/ProductList/template.vue';

export default {
  components: { ProductList },

  data() {
    return {
      products,
    };
  },

};
