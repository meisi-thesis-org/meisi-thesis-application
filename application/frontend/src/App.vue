<template>
    <Loader v-show="isLoading" />
    <router-view v-show="!isLoading"></router-view>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import { useLoader } from "@/composables/useLoader";
const { isLoading } = useLoader();
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  --dark--theme--color: #394053;
  --light--theme--color: #FFFFFF;
  --blue--theme--color: #5382A1;

  background-color: var(--light--theme--color);
  color: var(--dark--theme--color);

  font-family: 'Quicksand', sans-serif;
}

html, body, #app {
  width: 100vw;
  min-height: 100vh;
}

</style>