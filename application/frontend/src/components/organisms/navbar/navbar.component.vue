<template>
    <div class="navbar">
        <div class="navbar__inner">
            <div class="navbar__inner group">
                <IconComponent name="menu" color="light" size="minimum"></IconComponent>
                <DividerComponent width="0.025rem" height="1.5rem"></DividerComponent>
                <TypographyComponent content="E-Bookler" :typography="'brand'"></TypographyComponent>
            </div>
            <div class="navbar__inner group">
                <IconComponent name="notification" color="light" size="minimum"></IconComponent>
                <IconComponent name="search" color="light" size="minimum"></IconComponent>
                <IconComponent name="settings" color="light" size="minimum"></IconComponent>
                <DividerComponent width="0.025rem" height="1.5rem"></DividerComponent>
                <IconComponent name="locale" color="light" size="minimum"></IconComponent>
                <IconComponent name="theme" color="light" size="minimum"></IconComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconComponent from "./../../atoms/icon/icon.component.vue";
import DividerComponent from "./../../atoms/divider/divider.component.vue";
import TypographyComponent from "./../../atoms/typography/typography.component.vue";
</script>

<style scoped lang="scss">
    .navbar {
        width: 100vw;

        box-shadow: 0 0 1rem 0.50rem #1a1a1a;

        &__inner {
            padding: 0.5rem;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            &.group {
                display: flex;
                flex-direction: row;
                align-items: center;

                gap: 0.5rem;
            }
        }
    }
</style>