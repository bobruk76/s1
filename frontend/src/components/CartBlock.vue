<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <CartBlockItem v-for="item in products" :item="item" :key="item.id" ></CartBlockItem>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalAmounts }}</b> товара на сумму <b>{{ totalSum | numberFormat }} ₽</b></p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import CartBlockItem from '@/components/CartBlockItem.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  name: 'CartBlock',
  components: { CartBlockItem },
  props: ['products', 'totalSum', 'totalAmounts'],
  filters: { numberFormat },
};
</script>
