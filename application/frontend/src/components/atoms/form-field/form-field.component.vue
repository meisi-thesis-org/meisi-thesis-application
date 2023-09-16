<template>
    <input class="form-field" :type="definedProps.type" :placeholder="definedProps.placeholder">
</template>

<script setup lang="ts">
    import { FormFieldProps } from './form-field.component.type';

    const definedProps = defineProps<FormFieldProps>()
</script>

<style scoped>
    .form-field {
        border: none;
        padding: 1rem 0.75rem;
        border-radius: 2px;

        background-color: inherit;
        color: inherit;
        box-shadow: 0px 0px 2px 0.5px rgba(0, 0, 0, 0.25); 

        font-family: inherit;
        outline: none;
    }
</style>