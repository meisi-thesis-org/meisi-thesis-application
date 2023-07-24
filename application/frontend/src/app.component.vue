<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .wrapper {
    min-height: inherit;
    width: inherit;

    background-color: var(--dark--primary);
    color: var(--light--primary);
  }
</style>