<template>
    <input id="form-control" :name="definedProps.name" :type="definedProps.type" :placeholder="definedProps.placeholder">
</template>

<script setup lang="ts">
import type { FormControlProps } from './FormControl.type';

const definedProps = defineProps<FormControlProps>()
</script>

<style scoped lang="scss">
#form-control {
    padding: 1.5rem;
    width: 100%;
    border: hidden;
    box-shadow: 0 0 0 0.020rem var(--dark--theme--color);
    border-radius: 0.15rem;
}
</style>