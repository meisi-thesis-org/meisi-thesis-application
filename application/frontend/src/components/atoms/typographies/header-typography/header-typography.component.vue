<template>
    <span class="content">{{ definedProps.content }}</span>
</template>

<script setup lang="ts">
type HeaderTypographyProps = {
  readonly content: string
}

const definedProps = defineProps<HeaderTypographyProps>();
</script>

<style scoped lang="scss">
    .content {
        font-size: clamp(0.5rem, 0.5rem + 0.5vw, 1.5rem);
        font-weight: thin;
        opacity: 0.20;
    }
</style>