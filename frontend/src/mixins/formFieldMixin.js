import BaseFormField from '@/components/BaseFormField.vue';

export default {
  props: ['name', 'title', 'error', 'placeholder', 'value'],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  name: 'InputFormField',
};
