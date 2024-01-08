<template>
    <p id="typography" :class="definedProps.segment" :style="definedStyle"> {{ definedProps.content }} </p>
</template>

<script setup lang="ts">
import type { TypographyProps } from '@/types/Typography';
import { computed } from 'vue';

const definedProps = defineProps<TypographyProps>();
const definedStyle = computed(() => ({
    color: definedProps.color === 'colorized' ? 'var(--blue--theme--color)' : 'currentColor'
}))
</script>

<style scoped lang="scss">
.brand { font-size: clamp(1rem, 1rem + 0.5vw, 2rem); font-weight: 700; }
.header { font-size: clamp(0.90rem, 0.90rem + 0.5vw, 1.90rem); font-weight: 600; }
.subHeader { font-size: clamp(0.80rem, 0.80rem + 0.5vw, 1.80rem); font-weight: 500; }
.paragraph { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; }
.designation { font-size: clamp(0.60rem, 0.60rem + 0.5vw, 1.60rem); font-weight: 600; opacity: 0.40; }
.placeholder { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; }
.error { font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem); font-weight: 400; color: red; }
</style>