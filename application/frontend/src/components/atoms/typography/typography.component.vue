<template>
    <span v-bind:class="props.typography"> {{ props.content }} </span>
</template>


<script setup lang="ts">
    type Typographies = "brand" | "header" | 'subHeader' | 'paragraph' ;

    type TypographyComponentProps = {
        readonly content: string;
        readonly typography: Typographies;
    }

    const props = defineProps<TypographyComponentProps>();
</script>

<style scoped lang="scss">
    .brand {
        font-size: clamp(1rem, 1rem + 0.5vw, 2rem);
        cursor: pointer;
    }

    .header {
        font-size: clamp(0.85rem, 0.85rem + 0.5vw, 1.85rem);
    }

    .subHeader {
        font-size: clamp(0.70rem, 0.70rem + 0.5vw, 1.70rem);
    }

    .paragraph {
        font-size: clamp(0.55rem, 0.55rem + 0.5vw, 1.55rem);
    }
</style>