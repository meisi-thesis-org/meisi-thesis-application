<template>
    <div id="segmented-card">
        <div id="segmented-card__inner">
            <Typography :content="definedProps.designation" :segment="'placeholder'" :color="'light-colorized'" />
            <Typography :content="definedProps.description" :segment="'subHeader'" :color="'light-colorized'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SegmentedCardProps } from '@/types/SegmentedCard';
import Typography from './Typography.vue';

const definedProps = defineProps<SegmentedCardProps>()
</script>

<style scoped lang="scss">
#segmented-card {
    max-width: 35rem;
    width: 100%;

    border: none;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.50rem 0 currentColor;

    background-color: var(--blue--theme--color);

    &__inner {
        width: 100%;
        padding: 2.5rem;
        text-align: center;
    }
}
</style>