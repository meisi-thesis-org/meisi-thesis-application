<template>
  <div class="navbar">
    <div class="navbar__inner">
      <div class="navbar__inner__box">
        <MenuIconComponent />
        <DividerComponent 
          :width="'0.025rem'" 
          :height="'2rem'" 
          :background-color="'var(--dark--secondary--color)'" 
        />
        <SpanTypographyComponent content="E-Bookler" />
      </div>
      <div class="navbar__inner__box">
        <SearchIconComponent />
        <SettingIconComponent />
        <DividerComponent 
          :width="'0.025rem'" 
          :height="'2rem'" 
          :background-color="'var(--dark--secondary--color)'" 
        />
        <SunIconComponent 
          @click="themeStore.updateTheme" 
          v-show="themeRefs.isLightTheme.value"
        />
        <MoonIconComponent 
          @click="themeStore.updateTheme"  
          v-show="themeRefs.isDarkTheme.value"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SpanTypographyComponent from "@/components/atoms/typography/span-typography/span-typography.component.vue"
  import DividerComponent from "@/components/atoms/divider/divider.component.vue";
  import MenuIconComponent from "@/components/atoms/icons/menu-icon/menu-icon.component.vue"
  import SearchIconComponent from "@/components/atoms/icons/search-icon/search-icon.component.vue"
  import SettingIconComponent from "@/components/atoms/icons/setting-icon/setting-icon.component.vue"
  import SunIconComponent from "@/components/atoms/icons/sun-icon/sun-icon.component.vue"
  import MoonIconComponent from "@/components/atoms/icons/moon-icon/moon-icon.component.vue"
  import { useThemeStore } from "@/stores/use-theme.store";
  import { storeToRefs } from "pinia";

  const themeStore = useThemeStore()
  const themeRefs = storeToRefs(themeStore)
</script>

<style scoped lang="scss">
  .navbar {
    height: 10vh;
    width: 100vw;

    box-shadow: 0 0 0.25rem 0.025rem var(--dark--secondary--color);
  }

  .navbar__inner {
      height: inherit;
      width: inherit;

      padding: 0 1.5rem;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
  }

  .navbar__inner__box {
    display: flex;
    align-items: center;
    
    gap: 0.75rem;
  }
</style>