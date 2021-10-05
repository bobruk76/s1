<template>
<MainPage></MainPage>
</template>

<style>
  @import "./css/style.min.css"
</style>

<script>
  import MainPage from '@/pages/MainPage/template.vue';
  import eventBus from '@/eventBus.js'

  export default {
    components: {
      MainPage
    },

    data() {
      return {
        currentPage: 'main',
        currentParams: {}

      };
    },

    methods: {
      gotoPage(pageName, pageParams) {
        this.currentPage = pageName;
        this.currentParams = pageParams || {};
      }
    },

    created() {
      eventBus.$on(gotoPage,
        (pageName, pageParams) => this.gotoPage(pageName, pageParams));
    }
  };
</script>
