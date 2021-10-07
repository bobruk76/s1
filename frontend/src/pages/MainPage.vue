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
import products from '@/data/products';
import ProductList from '@/components/ProductList/template.vue';
import BasePaginate from '@/components/BasePaginate/template.vue';
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
    };
  },

  computed: {
    filterProducts() {
      let filterProducts = products;

      filterProducts = filterProducts.filter((product) => (
        (product.categoryId === this.filterCategoryId || this.filterCategoryId === 0)
        && this.filterPriceFrom <= product.price
        && (product.colorIdList.includes(this.colorId) || this.colorId === 0)
        && (this.filterPriceTo >= product.price || this.filterPriceTo === 0)));

      return filterProducts;
    },

    countProductPages() {
      return Math.ceil(this.filterProducts.length / this.countPerPage);
    },

    products() {
      const offset = (this.page - 1) * this.countPerPage;
      return this.filterProducts.slice(offset, offset + this.countPerPage);
    },
  },

  created() {
    this.filterCategoryId = this.pageParams.categoryId || 0;
  },

};
</script>
