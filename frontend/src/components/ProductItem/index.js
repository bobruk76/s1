import allColors from '@/data/colors';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['product'],
  data() {
    return {
      allColors,
    };
  },
  filters: {
    numberFormat,
  },
};
