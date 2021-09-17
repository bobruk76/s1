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
      <ul class="colors colors--black">
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-7" value="#FFBE15"
                   checked="">
            <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-7" value="#8BE000">
            <span class="colors__value" style="background-color: #8BE000;">
                  </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-7" value="#222">
            <span class="colors__value" style="background-color: #222;">
                  </span>
          </label>
        </li>
      </ul>

    </li>
  </ul>
</template>

<script src="./index.js"></script>
