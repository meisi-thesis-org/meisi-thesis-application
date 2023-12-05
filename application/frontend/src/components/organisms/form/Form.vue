<template>
    <form id="form" @submit.prevent="onSubmit()">
        <div id="form__inner">
            <FormHeader :header="definedProps.formHeader.header" :sub-header="definedProps.formHeader.subHeader" />
            <FormSection v-for="formSection of definedProps.formSections" :designation="formSection.designation"
                :form-controls="formSection.formControls" @is-invalid="(data) => updateInvalidity(data)" />
            <div id="form__inner--buttons">
                <div id="form__inner--buttons__item" v-for="button of definedProps.buttons">
                    <Button :disabled="isInvalid" :content="button.content" :type="button.type" />
                </div>
            </div>
            <div id="form__inner--links">
                <div id="form__inner--links__item" v-for="link of definedProps.links">
                    <Link :content="link.content" :href="link.href" />
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import FormHeader from '@/components/molecules/form-header/FormHeader.vue';
import type { FormProps } from './Form.type';
import FormSection from '@/components/molecules/form-section/FormSection.vue';
import Button from '@/components/atoms/button/Button.vue';
import Link from '@/components/atoms/link/Link.vue';
import { ref } from 'vue';
const definedProps = defineProps<FormProps>();
const isInvalid = ref<boolean>(true)
const updateInvalidity = (invalid: boolean) => isInvalid.value = invalid
const onSubmit = () => {
    if(isInvalid.value) return
    return definedProps.onSubmit()
}
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

        &--links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }
}
</style>