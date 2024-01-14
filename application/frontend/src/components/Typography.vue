<template>
    <p id="typography" :class="[definedProps.segment, definedProps.color]"> {{ definedProps.content }} </p>
</template>

<script setup lang="ts">
import type { TypographyProps } from '@/types/Typography';
const definedProps = defineProps<TypographyProps>();
</script>

<style scoped lang="scss">
#typography { color: currentColor; }
.brand { font-size: clamp(1rem, 1rem + 0.5vw, 2rem); font-weight: 700; }
.header { font-size: clamp(0.90rem, 0.90rem + 0.5vw, 1.90rem); font-weight: 600; }
.subHeader { font-size: clamp(0.80rem, 0.80rem + 0.5vw, 1.80rem); font-weight: 500; }
.paragraph { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; }
.designation { font-size: clamp(0.60rem, 0.60rem + 0.5vw, 1.60rem); font-weight: 600; opacity: 0.40; }
.placeholder { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; }
.error { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; color: red; }
</style>