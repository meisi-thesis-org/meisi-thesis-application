<template>
    <div id="divider" :style="defineStyle"></div>
</template>

<script setup lang="ts">
import type { DividerProps } from '@/types/Divider';
import { computed } from 'vue';

const definedProps = defineProps<DividerProps>();
const defineStyle = computed(() => ({
    width: definedProps.width,
    height: definedProps.height
}))
</script>

<style scoped lang="scss">
#divider {
    background-color: currentColor;
    opacity: 0.35;
    border: none;
    margin: 0 0.5rem;
}
</style>