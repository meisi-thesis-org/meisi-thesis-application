<template>
    <div id="divider" :class="definedProps.backgroundColor" :style="defineStyles()"></div>
</template>

<script setup lang="ts">
import type { DividerProps } from './Divider.type';

const definedProps = defineProps<DividerProps>()

const defineStyles = () => ({
    width: definedProps.width,
    height: definedProps.height
})
</script>

<style lang="scss" scoped>
#divider {
    opacity: 0.25;
}
</style>