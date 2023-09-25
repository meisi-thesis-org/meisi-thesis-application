<script setup lang="ts">
import { SpinnerComponent } from "./components/atoms/spinner";
import { useSpinner } from "./composables/use-spinner.composable";
const useSpinnerComposable = useSpinner()
</script>

<template>
    <div class="wrapper">
        <SpinnerComponent></SpinnerComponent>
        <router-view :class="useSpinnerComposable.state.value ? 'spinner--active' : 'spinner--deactive'"></router-view>
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

    color: #343540;
    background-color: #fafafa;
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
