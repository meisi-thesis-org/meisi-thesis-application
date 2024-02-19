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
const definedProps = withDefaults(defineProps<CardProps>(), { showDescription: true })
const showDescription = computed(() => definedProps.showDescription)
</script>

<style scoped lang="scss">
#card {
    width: 100%;
    height: 10rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 0.25rem 0 currentColor;
    cursor: pointer;

    text-align: center;

    &__inner {
        height: inherit;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}

@media(min-width: 863px) {
    #card {
        width: 25rem;
    }
}
</style>