<template>
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

                <li class="colors__item" v-for="color in product.colors" :key="color.id">
                  <label class="colors__label">
                    <input class="colors__radio sr-only"
                           type="radio"
                           name="color-item"
                           :value="color.title"
                    >
                    <span class="colors__value"
                          :style="'background-color: ' + color.code + ';'">
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
            <b-alert v-show="productAdded" show variant="success">
              Товар успешно добавлен в корзину!
            </b-alert>

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
import axios from 'axios';
// import colors from '@/data/colors';
// import products from '@/data/products';
// import categories from '@/data/categories';
import { mapActions, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      productAmount: 1,
      productData: null,
      productAdded: false,
    };
  },
  methods: {
    ...mapActions(['addProductToCart']),
    ...mapMutations(['preloaderChangeStatus']),

    addToCart() {
      this.preloaderChangeStatus(true);
      if (this.productAmount > 0) {
        this.addProductToCart({
          productId: this.product.id,
          amount: this.productAmount,
        }).then(() => {
          this.productAdded = true;
        })
          .catch(() => {})
          .then(() => {
            this.preloaderChangeStatus(false);
          });
      }
    },

    increment() {
      this.productAmount += 1;
    },

    discrement() {
      if (this.productAmount > 1) {
        this.productAmount -= 1;
      }
    },

    loadProduct() {
      const url = `https://vue-study.skillbox.cc/api/products/${this.$route.params.id}`;
      axios.get(url).then((response) => {
        this.productData = response.data;
      });
    },
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      // return products.find((item) => item.id === +this.$route.params.id);
      return this.productData ? ((item = this.productData) => ({
        ...item,
        img: item.image.file.url,
      }))() : {};
    },
    category() {
      return this.productData ? this.product.category : {};
    },
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadProduct();
      },
      immediate: true,
    },
  },

};
</script>
