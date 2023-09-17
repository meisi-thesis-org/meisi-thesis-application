<template>
    <a class="link" :href="definedProps.path"> 
        <TypographyComponent :content="definedProps.content" :segment="'paragraph'"></TypographyComponent>
    </a>
</template>

<script setup lang="ts">
    import { LinkComponentProps } from './link.component.type';
    import { TypographyComponent } from "./../../atoms/typography";
    const definedProps = defineProps<LinkComponentProps>();
</script>

<style scoped lang="scss">
    .link {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
</style>