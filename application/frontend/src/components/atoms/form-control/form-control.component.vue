<template>
    <input class="form-control" :autocomplete="definedProps.autocomplete" :type="definedProps.type"
        :required="definedProps.required" :placeholder="definedProps.placeholder"
        :value="definedProps.type === 'submit' ? definedProps.value : ''">
</template>

<script setup lang="ts">
import { FormControlComponentProps } from './form-control.component.type';
const definedProps = defineProps<FormControlComponentProps>();
</script>

<style scoped>
.form-control {
    cursor: pointer;

    border: none;
    padding: 1rem 0.75rem;
    border-radius: 2px;

    background-color: inherit;
    color: inherit;
    box-shadow: 0px 0px 2px 0.5px rgba(0, 0, 0, 0.25);

    font-family: inherit;
    font-weight: 300;
    outline: none;
}
</style>