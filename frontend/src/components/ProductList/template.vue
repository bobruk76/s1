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
        <li class="colors__item"
            v-for="item in colors" :key="item.id"
            v-show="product.colorIdList.includes(item.id)">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" name="color-7" :value="item.value">
            <span class="colors__value" :style="'background-color: ' + item.value + ';'">
                  </span>
          </label>
        </li>
      </ul>

    </li>
  </ul>
</template>

<script src="./index.js"></script>
