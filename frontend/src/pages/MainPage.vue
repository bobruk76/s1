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
import axios from 'axios';
import { mapMutations } from 'vuex';
import ProductList from '@/components/ProductList.vue';
import BasePaginate from '@/components/BasePaginate.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_URL } from '@/config';

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
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },

    countProductPages() {
      return Math.ceil(this.countProducts / this.countPerPage);
    },

    products() {
      return this.productsData ? this.productsData.items.map((item) => ({
        ...item,
        img: item.image.file.url,
      })) : [];
    },
  },

  methods: {
    ...mapMutations(['preloaderChangeStatus']),

    getProducts() {
      this.preloaderChangeStatus(true);
      clearTimeout(this.timeProductLoad);
      this.timeProductLoad = setTimeout(() => axios.get(`${API_BASE_URL}/products`, {
        params: {
          page: this.page,
          limit: this.countPerPage,
          categoryId: this.filterCategoryId,
          colorId: this.colorId,
          minPrice: this.filterPriceFrom,
          maxPrice: this.filterPriceTo,
        },
      })
        .then(
          (response) => {
            this.productsData = response.data;
          },
        )
        .catch(() => {
        })
        .then(
          () => {
            this.preloaderChangeStatus(false);
          },
        ), 2000);
    },
  },
  watch: {
    page() {
      this.getProducts();
    },

    filterCategoryId() {
      this.getProducts();
    },

    colorId() {
      this.getProducts();
    },

    filterPriceFrom() {
      this.getProducts();
    },

    filterPriceTo() {
      this.getProducts();
    },

  },

  created() {
    this.filterCategoryId = this.$route.params.categoryId || 0;
    this.getProducts();
  },

};
</script>
