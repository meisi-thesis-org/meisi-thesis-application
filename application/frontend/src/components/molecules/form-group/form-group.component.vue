<template>
  <div class="form-group">
    <LabelTypographyComponent 
      v-show="props.name"
      :typography="props.name" 
    />
    <FormFieldComponent
      :type="props.type"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<script setup lang="ts">
  import FormFieldComponent from "@/components/atoms/form-field/form-field.component.vue"
  import LabelTypographyComponent from "@/components/atoms/typography/label-typography/label-typography.component.vue"

  const props = defineProps({
    name: String,
    type: String,
    placeholder: String
  })
</script>

<style scoped lang="scss"> 
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    text-align: left;

    width: 100%;
  }
</style>