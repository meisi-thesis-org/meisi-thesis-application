<template>
    <div id="navbar">
        <div id="navbar__inner">
            <div id="navbar__inner--box">
                <Typography :content="'E-Bookler'" :segment="'brand'" />
            </div>
            <div id="navbar__inner--box"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from './Typography.vue';
</script>

<style scoped lang="scss">
#navbar {
    min-height: 5rem;

    &__inner {
        padding: 0 2.5rem;
        min-height: inherit;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}
</style>