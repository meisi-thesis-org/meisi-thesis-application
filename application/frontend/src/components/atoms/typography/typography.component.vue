<template>
    <span class="typography" :class="definedProps.segment">
        {{ definedProps.content }}
    </span>
</template>

<script setup lang="ts">
    import { TypographyComponentProps } from './typography.component.type';
    const definedProps = defineProps<TypographyComponentProps>();
</script>

<style scoped lang="scss">
    .typography {
        color: inherit;
        
        &.brand {
            font-size: clamp(2rem, 2rem + 0.5vw, 3rem);
        }

        &.header {
            font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
            font-weight: 700;
        }

        &.sub-header {
            font-size: clamp(0.85rem, 0.85rem + 0.5vw, 1.85rem);
            font-weight: 100;
        }

        &.label {
            font-size: clamp(0.5rem, 0.5rem + 0.5vw, 1.5rem);
            opacity: 0.50;
        }

        &.paragraph {
            font-size: clamp(0.60rem, 0.60rem + 0.5vw, 1.60rem);
        }
    }
</style>