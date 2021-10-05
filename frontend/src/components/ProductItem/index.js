import colors from '@/data/colors';
import eventBus from '@/eventBus';
export default {
  props: ['product'],
  data() {
    return {
      product,
      colors,
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      eventBus.$emit('gotoPage', pageName, pageParams);
    },
  },
};
