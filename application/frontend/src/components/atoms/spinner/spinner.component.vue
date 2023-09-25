<template>
    <div class="spinner" v-if="useSpinnerComposable.state.value"></div>
</template>

<script setup lang="ts">
import { useSpinner } from '../../../composables/use-spinner.composable';
const useSpinnerComposable = useSpinner();
</script>

<style scoped lang="scss">
.spinner {
    width: 48px;
    height: 48px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.spinner::after,
.spinner::before {
    content: '';
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid currentColor;
    position: absolute;
    left: 0;
    top: 0;
    animation: animloader 2s linear infinite;
}

.spinner::after {
    animation-delay: 1s;
}

@keyframes animloader {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>