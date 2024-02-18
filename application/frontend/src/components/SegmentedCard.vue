<template>
    <div id="segmented-card">
        <div id="segmented-card__inner">
            <Typography :content="definedProps.designation" :segment="'designation'" :color="'light-colorized'" />
            <Typography :content="definedProps.description" :segment="'placeholder'" :color="'light-colorized'" />
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
    background: var(--banner--gradient--color);

    max-width: 100%;
    width: 100%;

    border: none;
    border-radius: 0.50rem;
    box-shadow: 0 0 0.75rem 0 currentColor;

    &__inner {
        width: 100%;
        padding: 2.5rem;
        text-align: center;
    }
}

@media(min-width: 812px) {
    #segmented-card {
        width: 25rem;
    }
}
</style>