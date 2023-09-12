<template>
    <span class="content">{{ definedProps.content }}</span>
</template>

<script setup lang="ts">
type SubHeaderTypographyProps = {
  readonly content: string
}

const definedProps = defineProps<SubHeaderTypographyProps>();
</script>

<style scoped lang="scss">
    .content {
        font-size: clamp(0.65rem, 0.65rem + 0.5vw, 1.65rem);
        font-weight: thin;
        opacity: 0.20;
    }
</style>