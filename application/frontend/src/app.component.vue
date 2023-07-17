<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: 'Quicksand', sans-serif;

    --dark--primary--color: #343540;
    --dark--secondary--color: #131317;
    --light--primary--color: #FAFAFA;
  }

  html, body {
    min-height: 100vh;
    width: 100vw;
  }

  #app {
    min-height: inherit;
    width: inherit;
  }

  .wrapper {
    min-height: inherit;
    width: inherit;

    display: flex;
    flex-direction: column;
  }

  .darkTheme {
    background-color: var(--dark--primary--color);
    color: var(--light--primary--color);
  }

  .lightTheme {
    background-color: var(--light--primary--color);
    color: var(--dark--primary--color);
  }
</style>