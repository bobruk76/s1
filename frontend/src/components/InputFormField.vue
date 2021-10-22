<template>
  <BaseFormField :title="title" :placeholder="placeholder" :error="error">
    <input class="form__input"
           v-model="dataValue" :type="type" :name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
  props: [
    {
      name: 'type',
      default: 'text',
    },
  ],
};
</script>
