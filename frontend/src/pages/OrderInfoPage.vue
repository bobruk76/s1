<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ 23621</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за выбор нашего магазина. На Вашу почту придет письмо с деталями заказа.
            Наши менеджеры свяжутся с Вами в течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <CartBlock :products="orderInfo.basket.items"
                   :total-sum="orderInfo.totalPrice"
                   :total-amounts="totalAmounts"
        >
          <p></p>
        </CartBlock>
      </form>
      <ul>
        <li v-for="order in orders" :key="order">
          <router-link :to="{ name: 'orderInfo', params: { id: order } }">
            №{{ order }}
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartBlock from '@/components/CartBlock.vue';

export default {
  name: 'OrderInfoPage',
  components: { CartBlock },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      orders: 'getAllOrders',
      orderInfo: 'getOrderInfo',
    }),

    totalAmounts() {
      return this.orderInfo ? this.orderInfo.basket.items.reduce((count, item) => count
        + item.quantity, 0) : 0;
    },
  },

  methods: {
    ...mapActions(['loadOrder']),
  },

  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrder(this.$route.params.id);
      },
      immediate: true,
    },
  },

};
</script>
