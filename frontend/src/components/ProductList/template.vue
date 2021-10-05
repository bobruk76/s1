<template>
<ul class="catalog__list">
  <li class="catalog__item" v-for="product in products" :key="product.id">
    <ProductItem :product="product"></ProductItem>
  </li>
</ul>
</template>

<script src="./index.js"></script>
