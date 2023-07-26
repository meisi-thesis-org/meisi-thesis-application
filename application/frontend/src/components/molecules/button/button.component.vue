<template>
  <button class="button">
    <SpanTypographyComponent :typography="$props.typography" />
  </button>
</template>

<script setup lang="ts">
  import SpanTypographyComponent from '@/components/atoms/typography/span-typography/span-typography.component.vue';

  defineProps({
    typography: String
  })
</script>

<style scoped lang="scss">
  :host {
    width: 100%;
  }

  .button {
    width: 100%;
    padding: 1.5rem 0;
    border: none;
    border-radius: 0.075rem;
    outline: none;
    background-color: transparent;
    color: inherit;
    box-shadow: 0 0 0.05rem 0.15rem var(--dark--secondary);

    cursor: pointer;
  }
</style>