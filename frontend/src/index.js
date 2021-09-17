import categories from './data/categories';
import products from './data/products';
import ProductList from './components/ProductList/template.vue';
import BasePaginate from './components/BasePaginate/template.vue';
import ProductFilter from './components/ProductFilter/template.vue';

export default {
  components: { ProductList, BasePaginate, ProductFilter },

  data() {
    return {
      page: 1,
      countPerPage: 3,
      filterCategoryId: 0,
      filterPriceFrom: 0,
      filterPriceTo: 0,

      categories,
    };
  },

  computed: {
    filterProducts() {
      let filterProducts = products;

      filterProducts = filterProducts.filter((product) => (
        product.categoryId === this.filterCategoryId || this.filterCategoryId === 0));

      return filterProducts;
    },

    countProductPages() {
      return Math.ceil(products.length / this.countPerPage);
    },

    products() {
      const offset = (this.page - 1) * this.countPerPage;
      return this.filterProducts.slice(offset, offset + this.countPerPage);
    },
  },

};
