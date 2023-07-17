<template>
  <div class="content">
    {{ props.content }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    content: String
  })
</script>

<style scoped>
  .content {
    font-size: clamp(0.85rem, 0.85rem + 0.5vw, 1.85rem);
    font-weight: 500;
  }
</style>