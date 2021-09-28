export default {
  model: {
    prop: 'page',
    event: 'paginate',
  },

  props: ['page', 'countPages'],

  methods: {
    paginate(page) {
      this.$emit('paginate', page);
    },
  },
  computed: {
  },
};
