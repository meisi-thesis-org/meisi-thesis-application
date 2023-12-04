<template>
  <div id="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  --dark--theme--color: #394053;
  --light--theme--color: #FFFFFF;

  background-color: var(--light--theme--color);
  color: var(--dark--theme--color);

  font-family: 'Quicksand', sans-serif;
}

html, body, #wrapper {
  width: 100vw;
  min-height: 100vh;
}
</style>