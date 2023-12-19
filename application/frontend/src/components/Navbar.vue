<template>
    <div id="navbar">
        <div id="navbar__inner">
            <Typography :content="'E-Bookler'" :segment="'brand'" />
            <div id="navbar__inner--icons">
                
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from './Typography.vue';


</script>

<style scoped lang="scss">
#navbar {
    height: 5rem;

    box-shadow: 0 0 0.25rem 0rem var(--dark--theme--color);

    &__inner {
        height: inherit;
        padding: 0 1.5rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;    
    }
}
</style>