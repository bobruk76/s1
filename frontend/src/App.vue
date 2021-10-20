<template>
  <body>
    <Preloader v-show="preloaderActive"></Preloader>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </body>
</template>

<style>
@import "./css/style.min.css";
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Preloader from '@/components/Preloader.vue';

export default {
  components: { Header, Footer, Preloader },
  methods: {
    ...mapActions(['loadBaskets']),
  },
  computed: {
    ...mapGetters(['preloaderActive']),
  },

  created() {
    this.loadBaskets();
  },

};

</script>
