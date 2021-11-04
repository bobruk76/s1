<template>
  <li class="cart__order">
    <h3>{{ item.product.title }}</h3>
    <b>{{ item.quantity }} x {{ item.price | numberFormat }} ₽</b>
    <span>Артикул: {{ item.product.id }}</span>
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
