<template>
  <BaseFormField :title="title" :placeholder="placeholder" :error="error">
    <textarea class="form__input form__input--area"
              v-model="dataValue" :name="name" :placeholder="placeholder"
    >
    </textarea>
    <span class="form__value">{{ title }}</span>
  </BaseFormField>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
