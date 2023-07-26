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
    font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem);
    color: inherit;
    font-family: inherit;
  }
</style>