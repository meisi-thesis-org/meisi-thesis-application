<template>
    <button id="button" type="submit">
        <Typography :content="definedProps.placeholder" :segment="'placeholder'" />
    </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@/types/Button';
import Typography from './Typography.vue';

const definedProps = defineProps<ButtonProps>()
</script>

<style scoped lang="scss">
#button {
    cursor: pointer;

    width: 100%;
    padding: 1.5rem;

    border: none;
    border-radius: 0.15rem;
    box-shadow: 0 0 0 0.025rem currentColor;
}
</style>