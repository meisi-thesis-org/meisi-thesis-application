<template>
    <div id="navbar">
        <div id="navbar__inner">
            <Typography :content="'E-Bookler'" :segment="'brand'" />
            <div id="navbar__inner--icons">
                <Icon :name="'dashboard'" :height="'1.25rem'" :width="'1.25rem'" />
                <Icon :name="'settings'" :height="'1.25rem'" :width="'1.25rem'" />
                <Divider :width="'0.025rem'" :height="'2rem'" />
                <Icon :name="'locale'" :height="'1.25rem'" :width="'1.25rem'" />
                <Icon :name="'theme'" :height="'1.25rem'" :width="'1.25rem'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Divider from './Divider.vue';
import Icon from './Icon.vue';
import Typography from './Typography.vue';
</script>

<style scoped lang="scss">
#navbar {
    height: 5rem;

    box-shadow: 0 0 0.05rem 0rem currentColor;

    &__inner {
        height: inherit;
        padding: 0 1.25rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &--icons {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;
        }
    }
}
</style>