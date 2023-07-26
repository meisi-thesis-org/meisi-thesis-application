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
    box-shadow: 0 0 0.050rem 0.15rem var(--dark--secondary);
    background-color: transparent;
    color: inherit;
    padding: 1.5rem;
    outline: none;

    font-family: inherit;
    font-weight: bolder;
  }
</style>