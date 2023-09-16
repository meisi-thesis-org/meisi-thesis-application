<template>
    <span class="typography" :class="definedProps.segment">
        {{ definedProps.content }}
    </span>
</template>

<script setup lang="ts">
    import { TypographyProps } from './typography.component.type';
    const definedProps = defineProps<TypographyProps>();
</script>

<style scoped lang="scss">
    .typography {
        &.brand {
            font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
        }

        &.header {
            font-size: clamp(0.90rem, 0.90rem + 0.5vw, 1.90rem);
            font-weight: 700;
        }

        &.sub-header {
            font-size: clamp(0.80rem, 0.80rem + 0.5vw, 1.80rem);
            font-weight: 100;
        }

        &.label {
            font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem);
            opacity: 0.50;
        }

        &.placeholder {
            font-size: clamp(0.60rem, 0.60rem + 0.5vw, 1.60rem);
            opacity: 0.50;
        }

        &.paragraph {
            font-size: clamp(0.60rem, 0.60rem + 0.5vw, 1.60rem);
        }
    }
</style>