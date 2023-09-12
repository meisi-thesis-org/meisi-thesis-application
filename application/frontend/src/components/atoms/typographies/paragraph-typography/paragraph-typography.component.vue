<template>
    <span class="content">{{ definedProps.content }}</span>
</template>

<script setup lang="ts">
type ParagraphTypographyProps = {
  readonly content: string
}

const definedProps = defineProps<ParagraphTypographyProps>();
</script>

<style scoped lang="scss">
    .content {
        font-size: clamp(0.80rem, 0.80rem + 0.5vw, 1.80rem);
    }
</style>