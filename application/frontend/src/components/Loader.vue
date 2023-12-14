<template>
    <span id="loader"></span>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#loader {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    width: 48px;
    height: 48px;
    border: 3px solid var(--blue--theme--color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

#loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid;
    border-color: var(--blue--theme--color) transparent;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>