<template>
  <form class="form">
    <HeaderTypographyComponent 
      v-show="props.greeting"
      :typography="props.greeting"
    />
    <FormGroupComponent
      v-for="formGroup of props.formGroups"
      :name="formGroup.name"
      :type="formGroup.type"
      :placeholder="formGroup.placeholder"
    />
  </form>
</template>

<script setup lang="ts">
  import FormGroupComponent from '@/components/molecules/form-group/form-group.component.vue';
  import HeaderTypographyComponent from '@/components/atoms/typography/header-typography/header-typography.component.vue';

  const props = defineProps({
    greeting: String,
    formGroups: Array<{ name: string, type: string, placeholder: string}>
  })
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;

    width: 80%;
    max-width: 520px;
  }
</style>