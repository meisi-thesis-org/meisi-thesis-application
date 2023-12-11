<template>
    <form @submit.prevent="onSubmit($event)" id="form">
        <FormHeader :header="definedProps.formHeader.header" :sub-header="definedProps.formHeader.subHeader" />
        <div id="form__body">
            <div id="form__body--sections">
                <FormSection v-for="formSection of definedProps.formSections" :designation="formSection.designation"
                    :form-controls="formSection.formControls" @is-invalid="(data) => updateInvalidity(data)" />
            </div>
            <FormAction :buttons="definedProps.formAction.buttons" :links="definedProps.formAction.links" />
        </div>
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
const onSubmit = (data: Event) => {
    if (isInvalid.value) return;
    return definedProps.onSubmit(data);
}
</script>

<style scoped lang="scss">
#form {
    padding: 0 2.5rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__body {
        display: inherit;
        flex-direction: inherit;
        gap: 0.5rem;
        
        &--sections {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
    }
}
</style>