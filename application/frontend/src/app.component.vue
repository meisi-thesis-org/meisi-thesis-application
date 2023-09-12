<script setup lang="ts">
    import NavbarComponent from "./components/organisms/navbar/navbar.component.vue"
</script>

<template>
    <div class="wrapper">
        <NavbarComponent></NavbarComponent>
    </div>
</template>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
    
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .wrapper {
        font-family: 'Quicksand', sans-serif;


    }
</style>
