<template>
  <div class="typography">
    {{ props.typography }}
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({ typography: String })
</script>

<style scoped lang="scss">
  .typography {
    font-size: clamp(0.85rem, 0.85rem + 0.5rem, 1.85rem);
  }
</style>