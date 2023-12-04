<template>
    <div id="divider" :style="style"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DividerProps } from './Divider.type';

const definedProps = defineProps<DividerProps>()
const style = computed(() => ({ ...definedProps }))
</script>

<style scoped lang="scss">
#divider {
    background-color: currentColor;
    opacity: 0.40;
}
</style>