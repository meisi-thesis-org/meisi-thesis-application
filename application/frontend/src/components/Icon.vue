<template>
    <img :src="icon" alt="icon" :id="componentId">
</template>

<script setup lang="ts">
import type { IconProps } from '@/types/Icon';
import { computed } from 'vue';
const definedProps = defineProps<IconProps>();
const componentId = computed(() => `icon__${definedProps.designation}`)
const icon = computed(() => `./../svgs/${definedProps.designation}.svg`)
</script>

<style scoped lang="scss"></style>