<template>
  <input class="form-field" :type="props.type" :placeholder="props.placeholder">
</template>

<script setup lang="ts">
  const props = defineProps({
    type: String,
    placeholder: String
  })
</script>

<style scoped lang="scss">
  .form-field {
    border: none;
    border-radius: 0.075rem;
    box-shadow: 0 0 0.50rem 0.25rem var(--dark--secondary);
    background-color: transparent;
    color: inherit;
    padding: 1rem;
    outline: none;
  }
</style>