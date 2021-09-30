export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },

  props: ['page', 'countPages'],

  methods: {
    paginate(page) {
      if ((page >= 1) && (page <= this.countPages)) {
        this.$emit('paginate', page);
      }
    },
  },
  computed: {
  },
};
