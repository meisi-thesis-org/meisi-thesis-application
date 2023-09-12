<template>
    <span class="content">{{ definedProps.content }}</span>
</template>

<script setup lang="ts">

type BrandTypographyProps = {
  readonly content: string
}

const definedProps = defineProps<BrandTypographyProps>();
</script>

<style scoped lang="scss">
    .content {
        cursor: pointer;
        font-size: clamp(0.95rem, 0.95rem + 0.5vw, 1.95rem);
    }
</style>