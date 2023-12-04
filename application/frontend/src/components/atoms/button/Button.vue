<template>
    <button :type="definedProps.type" id="button">
        <Typography :content="definedProps.content" :segment="'placeholder'" />
    </button>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/typography/Typography.vue";
import type { ButtonProps } from "./Button.type";
const definedProps = defineProps<ButtonProps>()
</script>

<style scoped lang="scss">
#button {
    cursor: pointer;

    padding: 1.5rem;
    width: 100%;
    border: hidden;
    box-shadow: 0 0 0 0.020rem var(--dark--theme--color);
    border-radius: 0.15rem;
}
</style>