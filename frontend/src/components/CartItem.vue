<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.img" width="120" height="120"
           :alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
                Артикул: {{ item.productId }}
              </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар"
              @click.prevent="decrementProduct(item.productId)"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар"
              @click.prevent="incrementProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ item.totalPrice | numberFormat }} ₽
    </b>

    <button class="product__del button-del"
            type="button" aria-label="Удалить товар из корзины"
            @click.prevent="removeProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartItem',

  props: ['item'],

  filters: { numberFormat },

  methods: {
    incrementProduct() {
      this.amount += 1;
    },

    decrementProduct() {
      this.amount -= 1;
    },
    ...mapActions(['removeProduct', 'updateProductToCart']),
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        if (value > 0) {
          this.updateProductToCart({ productId: this.item.productId, amount: value });
        } else {
          this.removeProduct(this.item.productId);
        }
      },
    },
  },
};
</script>
