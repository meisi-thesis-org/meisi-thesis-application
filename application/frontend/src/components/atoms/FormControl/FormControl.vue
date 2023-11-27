<template>
    <input id="form-control" class="card" :type="definedProps.type" :placeholder="definedProps.placeholder">
</template>

<script setup lang="ts">
import { type FormControlProps } from './FormControl.type';

const definedProps = defineProps<FormControlProps>()
</script>

<style scoped lang="scss">
#form-control {
    color: inherit;
    background-color: inherit;
    text-align: left;

    padding: 1rem;
}
</style>