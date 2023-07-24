<template>
  <div class="container">
    <div class="container__inner">
      <HeaderTypographyComponent :typography="'E-Bookler'" />
      <SubHeaderTypographyComponentVue :typography="'Our Platform. Your creativity. Monetize your content.'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderTypographyComponent from '@/components/atoms/typography/header-typography/header-typography.component.vue';
  import SubHeaderTypographyComponentVue from '@/components/atoms/typography/sub-header-typography/sub-header-typography.component.vue';
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
    width: 100vw;
  }

  .container__inner {
    min-height: inherit;
    width: inherit;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;

    gap: .5rem;
  }
</style>