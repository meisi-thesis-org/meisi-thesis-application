<template>
    <router-view></router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  font-family: 'Quicksand', sans-serif;

  --dark--primary--color: #394053;
  --light--primary--color: #fff;
}

html, body, #app {
  min-height: 100vh;
  width: 100vw;
}

.card {
    padding: 1.25rem;
    border: none;
    box-shadow: 0 0 0.15rem 0 var(--dark--primary--color);
    text-align: center;
    border-radius: 0.050rem;

    width: 100%;
}

.dark-theme {
    color: var(--light--primary--color);
    background-color: var(--dark--primary--color);
}

.light-theme {
    color: var(--dark--primary--color);
    background-color: var(--light--primary--color);
}
</style>
