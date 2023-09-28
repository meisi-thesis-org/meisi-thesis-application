<script setup lang="ts">
import { SpinnerComponent } from "./components/atoms/spinner";
import { useSpinnerComposable } from "./composables/use-spinner.composable";
import { NavbarComponent } from "./components/organisms/navbar";
import { useThemeComposable } from "./composables/use-theme.composable";
const { state } = useSpinnerComposable();
const { getTheme } = useThemeComposable();
</script>

<template>
    <div class="wrapper" :class="'theme-' + getTheme().toLocaleLowerCase()">
        <NavbarComponent></NavbarComponent>
        <SpinnerComponent></SpinnerComponent>
        <router-view :class="state ? 'spinner--active' : 'spinner--deactive'"></router-view>
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

    min-height: 100vh;
    width: 100vw;

    &.theme-dark {
        background-color: #343540;
        color: #fafafa;
    }

    &.theme-light {
        color: #343540;
        background-color: #fafafa;
    }
}

.spinner {
        &--active {
            opacity: 0.25;
        }

        &--deactive {
            opacity: 1;
        }
    }
</style>
