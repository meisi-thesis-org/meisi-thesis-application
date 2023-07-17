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
    font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem);
    font-weight: 500;
  }
</style>