<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <NavbarComponent />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavbarComponent from "@/components/organisms/navbar/navbar.component.vue";
</script>

<style lang="scss">
  @import "./assets/scss/$colors.scss";
  @import "./assets/scss/$base.scss";
  @import "./assets/scss/$themes.scss";

  .wrapper {
    min-height: inherit;
    width: inherit;

    &__inner {
      min-height: inherit;
      width: inherit;

      display: flex;
      flex-direction: column;
    }
  }
</style>