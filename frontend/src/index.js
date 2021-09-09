import products from './data/products';
import ProductList from './components/ProductList/template.vue';
import BasePaginate from './components/BasePaginate/template.vue';

export default {
  components: { ProductList, BasePaginate },

  data() {
    return {
      page: 1,
      countPerPage: 3,
    };
  },
  computed: {
    countProductPages() {
      return Math.ceil(products.length / this.countPerPage);
    },
    products() {
      return products;
    },
  },

};
