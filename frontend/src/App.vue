<template>
  <component :is='currentPageComponent' :page-params='currentParams'></component>
</template>

<style>
  @import "./css/style.min.css"
</style>

<script>
  import MainPage from '@/pages/MainPage/template.vue';
  import ProductPage from '@/pages/ProductPage/template.vue';
  import NotFoundPage from '@/pages/NotFoundPage.vue';
  import eventBus from '@/eventBus.js';

  const routes = {
    main: 'MainPage',
    product: 'ProductPage',
  };

  export default {
    components: {
      MainPage,
      ProductPage,
      NotFoundPage,
    },

    data() {
      return {
        currentPage: 'main',
        currentParams: {},

      };
    },

    methods: {
      gotoPage(pageName, pageParams) {
        this.currentPage = pageName;
        this.currentParams = pageParams || {};
      },
    },

    created() {
      eventBus.$on(gotoPage,
        (pageName, pageParams) => this.gotoPage(pageName, pageParams));
    },

    computed: {
      currentPageComponent() {
        return routes[this.currentPage] || 'NotFoundPage';
      }
    },
  };
</script>
