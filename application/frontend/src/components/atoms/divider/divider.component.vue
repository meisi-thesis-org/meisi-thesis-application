<template>
    <div :style="defineStyles()"></div>
</template>

<script setup lang="ts">
    type DividerComponentProps = {
        readonly width: string;
        readonly height: string;
    }
    
    const props = defineProps<DividerComponentProps>();

    const defineStyles = () => ({
        height: props.height,
        width: props.width,
        'background-color': 'currentColor',
        'opacity': '0.15'
    })
</script>