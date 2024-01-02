<template>
    <button @click="onClick()" id="button" type="submit">
        <Typography :content="definedProps.placeholder" :segment="'placeholder'" />
    </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@/types/Button';
import Typography from './Typography.vue';

const definedProps = defineProps<ButtonProps>()
const onClick = () => {
    if(definedProps.onClick) {
        definedProps.onClick()
    }
}
</script>

<style scoped lang="scss">
#button {
    cursor: pointer;

    width: 100%;
    padding: 1.5rem;

    border: none;
    box-shadow: 0 0 0.25rem 0 currentColor;
    background: none;
}
</style>