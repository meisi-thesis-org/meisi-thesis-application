<template>
    <div class="divider" :style="defineStyles()"></div>
</template>

<script setup lang="ts">
    import { DividerProps } from './divider.component.type';

    const definedProps = defineProps<DividerProps>()

    const defineStyles = (): Record<string, string> => {
        return {
            width: definedProps.width,
            height: definedProps.height,
            'background-color': 'currentColor',
            'opacity': '0.10'
        }
    }
</script>

<style scoped lang="scss"></style>