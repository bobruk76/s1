<template>
  <div>
    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.img" :alt="product.title">
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
    {{ product.price | numberFormat }} ₽
  </span>

    <ul class="colors colors&#45;&#45;black">
      <li class="colors__item" v-for="item in allColors"
          :key="item.id"
          v-show="product.colorIdList.includes(item.id)">
        <label class="colors__label">
          <input class="colors__radio sr-only"
                 type="radio" name="color-7"
                 :value="item.value">
          <span class="colors__value"
                :style="'background-color: ' + item.value + ';'">
        </span>
        </label>
      </li>
    </ul>

  </div>
</template>

<script src="./index.js"></script>
