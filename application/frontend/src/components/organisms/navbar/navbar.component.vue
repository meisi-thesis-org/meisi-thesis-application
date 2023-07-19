<template>
  <div class="container">
    <div class="container__inner">
      <div class="container__inner__box">
        <MenuIconComponent />
        <SpanTypographyComponent
          :content="'E-Bookler'"
        />  
      </div>
      <div class="container__inner__box">
        <SunIconComponent />
        <MoonIconComponent />
        <SettingsIconComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MenuIconComponent from "@/components/atoms/icons/menu-icon/menu-icon.component.vue";
  import MoonIconComponent from "@/components/atoms/icons/moon-icon/moon-icon.component.vue";
  import SettingsIconComponent from "@/components/atoms/icons/settings-icon/settings-icon.component.vue";
  import SunIconComponent from "@/components/atoms/icons/sun-icon/sun-icon.component.vue";
  import SpanTypographyComponent from "@/components/atoms/typographies/span-typography/span-typography.component.vue"
</script>

<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 4rem;
  }

  .container__inner {
    width: inherit;
    height: inherit;

    padding: 0 2rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 0.5rem 0.05rem var(--dark--secondary--color);
  }

  .container__inner__box {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    gap: 0.25rem;
  }
</style>