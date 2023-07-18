<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  @import "./assets/scss/$colors.scss";
  @import "./assets/scss/$base.scss";
  @import "./assets/scss/$themes.scss";

  .wrapper {
    min-height: inherit;
    width: inherit;

    display: flex;
    flex-direction: column;
  }
</style>