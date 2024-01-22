<template>
    <div id="card">
        <div id="card__inner">
            <Typography :content="definedProps.designation" :segment="'header'" />
            <Typography :content="definedProps.description" :segment="'paragraph'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePermission } from '@/composables/usePermission';
import type { CardProps } from '@/types/Card';
import Typography from './Typography.vue';
const definedProps = defineProps<CardProps>()
const { isOwner } = usePermission();
</script>

<style scoped lang="scss">
#card {
    cursor: pointer;

    border: none;
    box-shadow: 0 0 0.50rem 0 currentColor;

    &__inner {
        padding: 3.5rem;

        height: inherit;
        background-color: var(--blue--theme--color);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 0.25rem;
    }
}
</style>