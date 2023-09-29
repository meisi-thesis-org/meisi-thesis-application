<template>
    <div class="navbar">
        <div class="navbar__inner">
            <div class="navbar__inner--box">
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent :name="'menu'"></IconComponent>
                </div>
                <DividerComponent :width="'0.025rem'" :height="'2.5vh'"></DividerComponent>
                <div class="navbar__inner--box__typography">
                    <TypographyComponent :content="'E-Bookler'" :segment="'brand'"></TypographyComponent>
                </div>
            </div>
            <div class="navbar__inner--box">
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent :name="'search'"></IconComponent>
                    <IconComponent :name="'settings'"></IconComponent>
                </div>
                <DividerComponent :width="'0.025rem'" :height="'2.5vh'"></DividerComponent>
                <div class="navbar__inner--box__icon-collection">
                    <IconComponent :name="'locale'"></IconComponent>
                    <IconComponent :name="'sun'"></IconComponent>
                    <IconComponent :name="'moon'"></IconComponent>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconComponent } from '../../atoms/icon';
import { TypographyComponent } from '../../atoms/typography';
import { DividerComponent } from '../../atoms/divider';
</script>

<style scoped lang="scss">
.navbar {
    height: 5vh;

    &__inner {
        height: inherit;
        padding: 1.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &--box {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            gap: 0.5rem;

            &__icon-collection {
                display: flex;
                gap: 0.15rem;
            }
        }
    }
}
</style>