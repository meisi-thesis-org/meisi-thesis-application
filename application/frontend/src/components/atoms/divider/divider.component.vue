<template>
    <span class="content" :style="defineStyles()"></span>
</template>

<script setup lang="ts">
type DividerProps = {
    readonly width: string;
    readonly height: string;
}

const definedProps = defineProps<DividerProps>();

const defineStyles = (): Record<string, string> => {
    return {
        'height': definedProps.height,
        'width': definedProps.width,
        'background-color': 'currentColor'
    }
}

</script>

<style scoped lang="scss"></style>