<template>
  <div class="divider"></div>
</template>

<script setup lang="ts">
  defineProps({
    width: String,
    height: String,
    backgroundColor: String
  })
</script>

<style scoped lang="scss">
  .divider {
    width: v-bind('$props.width');
    height: v-bind('$props.height');
    background-color: v-bind('$props.backgroundColor');
  }
</style>