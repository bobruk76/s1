<template>
  <section class="catalog">
    <ul class="catalog__list">
      <li class="catalog__item" v-for="(product, index) in products" :key="index">
        <a class="catalog__pic" href="#">
          <img :src="product.img" alt="Название товара">
        </a>

        <h3 class="catalog__title">
          <a href="#">
            {{ product.title }}
          </a>
        </h3>

        <span class="catalog__price">
              {{ product.price }}
            </span>

      </li>
    </ul>
  </section>
</template>

<style lang="stylus" scoped>
  @import "./styles.styl";

</style>

<script src="./index.js"></script>
