<script setup lang="ts">
import { SpinnerComponent } from "./components/atoms/spinner";
import { useSpinnerComposable } from "./composables/use-spinner.composable";
import { useThemeComposable } from "./composables/use-theme.composable";
const { state } = useSpinnerComposable();
const { getTheme } = useThemeComposable();
</script>

<template>
    <div class="wrapper" :class="'theme-' + getTheme().toLocaleLowerCase()">
        <div class="wrapper__inner">
            <router-view :class="state ? 'spinner--active' : 'spinner--deactive'"></router-view>
            <SpinnerComponent></SpinnerComponent>
        </div>
    </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}

.wrapper {
    min-height: 100vh;
    width: 100vw;

    &__inner {
        width: inherit;

        display: flex;
        flex-direction: row;
        min-height: inherit;

    }

    &.theme-dark {
        background-color: #0d0c22;
        color: #fafafa;
    }

    &.theme-light {
        color: #0d0c22;
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
