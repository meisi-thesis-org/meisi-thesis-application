<template>
    <div id="card" :style="!definedProps.isVisible || !definedProps.isActive ? { 'opacity': 0.60 } : { 'opacity': 100 }">
        <div id="card__inner">
            <Typography :content="definedProps.designation" :segment="'header'" :color="'blue-colorized'" />
            <Typography v-if="showDescription" :content="definedProps.description" :segment="'paragraph'"
                :color="'blue-colorized'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CardProps } from '@/types/Card';
import Typography from './Typography.vue';
import { computed } from 'vue';
const definedProps = withDefaults(defineProps<CardProps>(), {
    showDescription: true
})
const showDescription = computed(() => definedProps.showDescription)
</script>

<style scoped lang="scss">
#card {
    cursor: pointer;

    border: none;
    box-shadow: 0 0 0.50rem 0 currentColor;

    &__inner {
        padding: 3.5rem;
        height: inherit;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0.25rem;
    }
}
</style>