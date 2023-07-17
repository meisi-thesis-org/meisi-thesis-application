<template>
  <button class="button">
    <LabelTypographyComponent :content="props.content" />
  </button>
</template>

<script setup lang="ts">
  import LabelTypographyComponent from "@/components/atoms/typography/label-typography/label-typography.component.vue"

  const props = defineProps({
    content: String
  })
</script>

<style lang="scss" scoped>
  .button {
    padding: 1rem 1.5rem;

    border: none;
    border-radius: 0.15rem;

    background-color: inherit;
    color: inherit;
    
    box-shadow: 0 0 0.25rem 0.050rem var(--dark--secondary--color);
    
    cursor: pointer;
  }
</style>