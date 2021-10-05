import allColors from '@/data/colors';
import eventBus from '@/eventBus';

export default {
  props: ['product'],
  data() {
    return {
      allColors,
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      eventBus.$emit('gotoPage', pageName, pageParams);
    },
  },
};
