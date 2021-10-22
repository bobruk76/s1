<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ item.totalPrice | numberFormat }} ₽</b>
    <span>Артикул: {{ item.productId }}</span>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartBlockItem',
  props: ['item'],
  filters: { numberFormat },
};
</script>
