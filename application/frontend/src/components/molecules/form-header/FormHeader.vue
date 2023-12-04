<template>
    <div id="form-header">
        <div id="form-header__inner">
            <Typography :content="definedProps.header" segment="header" />
            <Typography :content="definedProps.subHeader" segment="sub-header" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from '@/components/atoms/typography/Typography.vue';
import type { FormHeaderProps } from './FormHeader.type';
const definedProps = defineProps<FormHeaderProps>()
</script>

<style scoped lang="scss">
#form-header {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

    }
}
</style>