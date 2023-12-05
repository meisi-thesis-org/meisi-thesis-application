<template>
    <p id="typography" :class="definedProps.segment"> {{ definedProps.content }} </p>
</template>

<script setup lang="ts">
import type { TypographyProps } from './Typography.type';

const definedProps = defineProps<TypographyProps>()
</script>

<style scoped lang="scss">
.brand { font-size: clamp(1.25rem, 1.25rem + 0.5vw, 2.25rem); font-weight: 700; }
.header { font-size: clamp(1rem, 1rem + 0.5vw, 2rem); font-weight: 600; }
.sub-header { font-size: clamp(0.9rem, 0.9rem + 0.5vw, 1.9rem); font-weight: 500; }
.paragraph { font-size: clamp(0.8rem, 0.8rem + 0.5vw, 1.8rem); font-weight: 400; }
.label { font-size: clamp(0.7rem, 0.7rem + 0.5vw, 1.7rem); font-weight: 500; opacity: 0.75; }
.error { font-size: clamp(0.7rem, 0.7rem + 0.5vw, 1.7rem); font-weight: 800; opacity: 0.75; }
.placeholder { font-size: clamp(0.8rem, 0.8rem + 0.5vw, 1.8rem); font-weight: 400; }
</style>