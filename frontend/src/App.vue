<template>
  <body>

  <Header></Header>

  <router-view></router-view>

  <Footer></Footer>

  </body>
</template>

<style>
@import "./css/style.min.css";
</style>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: { Header, Footer },

};

</script>
