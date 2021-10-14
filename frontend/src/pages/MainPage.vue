<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :page.sync="page"
        :color-id.sync="colorId"
      >

      </ProductFilter>
      <section class="catalog">
        <ProductList
          :products="products"
        >

        </ProductList>
        <BasePaginate
          :count-pages="countProductPages"
          v-model="page">
        </BasePaginate>
      </section>
    </div>
  </main>
</template>

<script>
// import products from '@/data/products';
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';
import BasePaginate from '@/components/BasePaginate.vue';
import ProductFilter from '@/components/ProductFilter/template.vue';

export default {
  props: ['pageParams'],
  components: { ProductList, BasePaginate, ProductFilter },

  data() {
    return {
      page: 1,
      countPerPage: 4,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      colorId: 0,
      filterCategoryId: 0,
      productsData: null,
    };
  },

  computed: {
    filterProducts() {
      let filterProducts = this.products;

      filterProducts = filterProducts.filter((product) => (
        (product.categoryId === this.filterCategoryId || this.filterCategoryId === 0)
        && this.filterPriceFrom <= product.price
        && (product.colorIdList.includes(this.colorId) || this.colorId === 0)
        && (this.filterPriceTo >= product.price || this.filterPriceTo === 0)));

      return filterProducts;
    },

    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },

    countProductPages() {
      return Math.ceil(this.countProducts / this.countPerPage);
    },

    products() {
      // const offset = (this.page - 1) * this.countPerPage;
      // return this.filterProducts.slice(offset, offset + this.countPerPage);
      return this.productsData ? this.productsData.items.map((item) => ({
        ...item,
        img: item.image.file.url,
      })) : [];
    },
  },

  methods: {
    getProducts() {
      const url = `https://vue-study.skillbox.cc/api/products?page=${this.page}&limit=${this.countPerPage}`;
      axios.get(url).then(
        (response) => {
          this.productsData = response.data;
        },
      );
    },
  },
  watch: {
    page() {
      this.getProducts();
    },
  },

  created() {
    this.filterCategoryId = this.$route.params.categoryId || 0;
    this.getProducts();
  },

};
</script>
