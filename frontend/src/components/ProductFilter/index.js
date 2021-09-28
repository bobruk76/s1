export default {
  props: ['colors', 'categories', 'priceFrom', 'priceTo', 'categoryId', 'page', 'colorId'],

  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
    };
  },
  methods: {
    submit() {
      this.$emit('update:page', 1);
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
    },

    reset() {
      this.$emit('update:page', 1);
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
  },
  computed: {
    /*
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
    */
  },

  created() {

  },
};
