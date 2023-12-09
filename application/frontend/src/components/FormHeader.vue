<template>
    <div id="form-header">
        <Typography :content="definedProps.header" :segment="'header'" />
        <Typography :content="definedProps.subHeader" :segment="'subHeader'" />
    </div>
</template>

<script setup lang="ts">
import type { FormHeaderProps } from '@/types/FormHeader';
import Typography from './Typography.vue';

const definedProps = defineProps<FormHeaderProps>();
</script>

<style scoped lang="scss">
#form-header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
</style>