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
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Количество товаров:{{ totalAmounts }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"></CartItem>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы посчитаем стоимость доставки на следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalSum | numberFormat }} ₽</span>
          </p>

          <router-link class="cart__button button button--primery"
                  type="submit"
                  :to="{ name: 'order' }">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import CartItem from '@/components/CartItem.vue';

export default {
  filters: {
    numberFormat,
  },
  components: { CartItem },
  computed: {
    ...mapGetters({
      products: 'cartDetailsProducts',
      totalAmounts: 'cartTotalAmounts',
      totalSum: 'cartTotalSum',
    }),
  },

  methods: {
    ...mapActions(['loadBaskets']),
  },

  created() {
    this.loadBaskets();
  },
};
</script>
