<template lang="html">
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            class="breadcrumbs__link"
            :to="{name: 'main', params : {categoryId: product.categoryId}}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="product.img"
               :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price">
              {{ product.price | numberFormat }} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">

                <li class="colors__item"
                    v-for="item in colors"
                    :key="item.id"
                    v-show="product.colorIdList.includes(item.id)"
                >
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio"
                           name="color-item"
                           :value="item.value"
                    >
                    <span class="colors__value"
                          :style="'background-color: ' + item.value + ';'">
                    </span>
                  </label>
                </li>

              </ul>
            </fieldset>

            <fieldset class="form__block">

            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар" @click="discrement">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model="productAmount">

                <button type="button" aria-label="Добавить один товар" @click="increment">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit" @click.prevent="addToCart">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <h3>Дизайн</h3>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import colors from '@/data/colors';
import products from '@/data/products';
import categories from '@/data/categories';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      colors,
      productAmount: 1,
    };
  },
  methods: {
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
      );
    },

    increment() {
      this.productAmount += 1;
    },

    discrement() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },

  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return products.find((item) => item.id === +this.$route.params.id);
    },
    category() {
      return categories.find((item) => item.id === this.product.categoryId);
    },
  },
};
</script>
