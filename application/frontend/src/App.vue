<template>
  <div id="wrapper" :class="theme">
    <Loader v-show="isLoading" />
    <router-view v-show="!isLoading"></router-view>
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { useLoader } from "@/composables/useLoader";
import { useTheme } from './composables/useTheme';
const { isLoading } = useLoader();
const { theme } = useTheme();
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  --dark--theme--color: #394053;
  --light--theme--color: #fff;
  --blue--theme--color: #5382A1;
  --yellow--theme--color: #EF9B0F;
  --violet--theme--color: #e81cff;

  --banner--gradient--color: linear-gradient(90deg, hsla(160, 50%, 51%, 1) 0%, hsla(247, 60%, 21%, 1) 100%);
  
  font-family: 'Quicksand', sans-serif;
}

.blue-colorized { color: var(--blue--theme--color) !important; }
.yellow-colorized { color: var(--yellow--theme--color) !important; }
.light-colorized { color: var(--light--theme--color) !important; }
.dark-colorized { color: var(--dark--theme--color) !important; }
.violet-colorized { color: var(--violet--theme--color) !important; }

html,
body,
#app,
#wrapper {
  width: 100vw;
  min-height: 100vh;
}

#wrapper {
  &.dark {
    background-color: var(--dark--theme--color);
    color: var(--light--theme--color);
  }

  &.light {
    background-color: var(--light--theme--color);
    color: var(--dark--theme--color);
  }
}
</style>