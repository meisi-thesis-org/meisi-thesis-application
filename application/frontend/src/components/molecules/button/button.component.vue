<template>
    <div class="button" v-on:click="action">
        <TypographyComponent :content="definedProps.content" :segment="'sub-header'"></TypographyComponent>
    </div>
</template>

<script setup lang="ts">
    import { TypographyComponent } from "./../../atoms/typography";
    import { ButtonComponentProps } from './button.component.type';
    
    const definedProps = defineProps<ButtonComponentProps>();
</script>

<style scoped lang="scss">
    .button {
        cursor: pointer;
        width: 100%;
        padding: 0.85rem 0;
        box-shadow: 0px 0px 2px 1.5px rgba(0, 0, 0, 0.25); 
        text-align: center;
    }
</style>