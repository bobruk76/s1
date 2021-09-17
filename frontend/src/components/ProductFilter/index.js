
export default {
  props: ['categories', 'priceFrom', 'priceTo', 'categoryId'],

  data() {
    return {

    };
  },
  computed: {
    currentPriceFrom: {
      get() {
        return this.priceFrom
      },
      set(value) {
        this.$emit('update:priceFrom', value)
      },

    },

    currentPriceTo: {
      get() {
        return this.priceTo
      },
      set(value) {
        this.$emit('update:priceTo', value)
      },

    },

    currentCategoryId: {
      get() {
        return this.categoryId
      },
      set(value) {
        this.$emit('update:categoryId', value)
      },

    },
  },

  methods: {

  },

  created() {

  },
};
