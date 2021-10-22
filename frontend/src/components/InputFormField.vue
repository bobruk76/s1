<template>
  <BaseFormField :title="title" :placeholder="placeholder" :error="error">
    <input class="form__input" v-model="value" :type="type" :name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/BaseFormField.vue';
export default {
  props: [
    'name', 'title', 'error', 'placeholder', 'value',
    {
      name: 'type',
      default: 'input',

    }
  ],
  components: { BaseFormField },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
  name: 'InputFormField',
}
</script>

<style scoped>

</style>
