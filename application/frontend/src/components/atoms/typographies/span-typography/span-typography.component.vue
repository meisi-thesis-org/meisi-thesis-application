<template>
  <div class="typography">
    {{ props.content }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    content: String
  })
</script>

<style scoped lang="scss">
  .typography {
    font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
    font-weight: bold;
  }
</style>