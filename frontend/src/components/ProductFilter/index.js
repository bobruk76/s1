import colors from '@/data/colors';
import categories from '@/data/categories';
export default {
  props: ['priceFrom', 'priceTo', 'categoryId', 'page', 'colorId'],

  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,
      colors,
      categories,
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
  created() {
    this.currentCategoryId = this.categoryId;
  }
};
