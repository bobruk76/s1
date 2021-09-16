<template>
    <ul class="catalog__list">
      <li class="catalog__item" v-for="product in products" :key="product.id">
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
</template>

<script src="./index.js"></script>
