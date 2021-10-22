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
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
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
          <div class="cart__data">

            <InputFormField
              v-model="formFields.name"
              :error="formErrors.name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
            >
            </InputFormField>

            <InputFormField
              v-model="formFields.address"
              :error="formErrors.address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
            >
            </InputFormField>

            <InputFormField
              v-model="formFields.phone"
              :error="formErrors.phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
              type="tel"
            >
            </InputFormField>

            <InputFormField
              v-model="formFields.email"
              :error="formErrors.email"
              placeholder="Введи ваш Email"
              title="Email"
              type="email"
            >
            </InputFormField>

            <TextareaFormField
              v-model="formFields.comments"
              :error="formErrors.comments"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
            >
            </TextareaFormField>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartBlock :products="products" :total-sum="totalSum" :total-amounts="totalAmounts">
          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </CartBlock>

        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import InputFormField from '@/components/InputFormField.vue';
import TextareaFormField from '@/components/TextareaFormField.vue';
import CartBlock from '@/components/CartBlock.vue';

export default {
  data() {
    return {
      formFields: {},
      formErrors: {},
    };
  },
  name: 'OrderPage',
  components: { InputFormField, TextareaFormField, CartBlock },
  methods: {
    ...mapActions(['loadBaskets']),
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailsProducts',
      totalAmounts: 'cartTotalAmounts',
      totalSum: 'cartTotalSum',
    }),
  },
  created() {
    this.loadBaskets();
  },
};
</script>
