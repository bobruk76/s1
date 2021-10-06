import allColors from '@/data/colors';
import gotoPage from '@/helpers/gotoPage';
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
  methods: {
    gotoPage,
  },
};
