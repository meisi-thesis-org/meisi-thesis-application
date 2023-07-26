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
    font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
    font-weight: bold;

    color: inherit;
    font-family: inherit;
  }
</style>