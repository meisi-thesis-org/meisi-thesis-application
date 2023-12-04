<template>
    <form id="form" @submit.prevent="definedProps.onSubmit()">
        <div id="form__inner">
            <FormHeader :header="definedProps.formHeader.header" :sub-header="definedProps.formHeader.subHeader" />
            <FormSection v-for="formSection of definedProps.formSections" :designation="formSection.designation"
                :form-controls="formSection.formControls" />
            <FormAction :buttons="definedProps.formAction.buttons" :links="definedProps.formAction.links" />
        </div>
    </form>
</template>

<script setup lang="ts">
import FormHeader from '@/components/molecules/form-header/FormHeader.vue';
import type { FormProps } from './Form.type';
import FormSection from '@/components/molecules/form-section/FormSection.vue';
import FormAction from '@/components/molecules/form-action/FormAction.vue';

const definedProps = defineProps<FormProps>();
</script>

<style scoped lang="scss">
#form {
    min-height: inherit;

    &__inner {
        padding: 1.5rem;
        min-height: inherit;

        display: flex;
        flex-direction: column;
        justify-content: center;

        gap: 1rem;
    }
}
</style>