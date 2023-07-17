<template>
  <div class="landing">
    <div class="landing__inner">
      <div class="landing__inner__box">
        <HeaderTypographyComponent :content="'E-Bookler'" />
        <SubHeaderTypographyComponent :content="'Monetize your writting time!'" />
      </div>
      <TypographyButtonComponent :content="'Getting Started'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderTypographyComponent from "@/components/atoms/typography/header-typography/header-typography.component.vue";
  import SubHeaderTypographyComponent from "@/components/atoms/typography/sub-header-typography/sub-header-typography.component.vue";
import TypographyButtonComponent from "@/components/molecules/buttons/typography-button/typography-button.component.vue";
</script>

<style lang="scss" scoped>
  .landing {
    height: 90vh;
    width: 100vw;
  }

  .landing__inner {
    height: inherit;
    width: inherit;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }

  .landing__inner__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    gap: 0.5rem;
  }
</style>