<template>
    <form @submit.prevent="onSubmit()" id="form">
        <FormHeader :header="definedProps.formHeader.header" :sub-header="definedProps.formHeader.subHeader" />
        <div id="form--sections">
            <FormSection v-for="formSection of definedProps.formSections" :designation="formSection.designation"
                :form-controls="formSection.formControls" @is-invalid="(data) => updateInvalidity(data)" />
        </div>
        <FormAction :buttons="definedProps.formAction.buttons" :links="definedProps.formAction.links" />
    </form>
</template>

<script setup lang="ts">
import type { FormProps } from '@/types/Form';
import FormSection from './FormSection.vue';
import FormHeader from './FormHeader.vue';
import FormAction from './FormAction.vue';
import { ref } from 'vue';

const definedProps = defineProps<FormProps>()
const isInvalid = ref<boolean>(false)
const updateInvalidity = (invalid: boolean) => isInvalid.value = invalid;
const onSubmit = () => {
    if (isInvalid.value) return
}
</script>

<style scoped lang="scss">
#form {
    padding: 0 2.5rem;

    display: flex;
    flex-direction: column;
    gap: 0.50rem;

    &--sections {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
}
</style>