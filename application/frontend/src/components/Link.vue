<template>
    <div @click="definedProps.href()" id="link">
        <Typography :content="definedProps.placeholder" :segment="'designation'" />
    </div>
</template>

<script setup lang="ts">
import Typography from './Typography.vue';
import type { LinkProps } from '@/types/Link';

const definedProps = defineProps<LinkProps>()
</script>

<style scoped lang="scss">
#link {
    cursor: pointer;
}
</style>