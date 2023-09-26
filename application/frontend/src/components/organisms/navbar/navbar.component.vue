<template>
    <div class="navbar">
        <div class="navbar__inner">
            <div class="navbar__inner--box">
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent></IconComponent>
                </div>
                <DividerComponent :width="'0.025rem'" :height="'2.5rem'"></DividerComponent>
                <div class="navbar__inner--box__typography">
                    <TypographyComponent :content="'E-Bookler'" :segment="'brand'"></TypographyComponent>
                </div>
            </div>
            <div class="navbar__inner--box">
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent></IconComponent>
                    <IconComponent></IconComponent>
                </div>
                <DividerComponent :width="'0.025rem'" :height="'2.5rem'"></DividerComponent>
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent></IconComponent>
                    <IconComponent></IconComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconComponent } from '../../atoms/icon';
import { TypographyComponent } from '../../atoms/typography';
</script>

<style scoped lang="scss">
.navbar {
    height: 2.5rem;

    &__inner {
        height: inherit;
        padding: 0 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
}
</style>