<template>
    <div id="form-section">
        <div id="form-section__inner">
            <Typography :content="definedProps.designation" :segment="'label'" />
            <div id="form-section__inner--form__control" v-for="formControl of definedProps.formControls">
                <FormControl :type="formControl.type" :name="formControl.name" :placeholder="formControl.placeholder" :rules="formControl.rules" @is-invalid="(errors) => $emit('isInvalid', errors)"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from '@/components/atoms/typography/Typography.vue';
import type { FormSectionProps } from './FormSection.type';
import FormControl from "@/components/atoms/form-control/FormControl.vue"
const definedProps = defineProps<FormSectionProps>()
const definedEmits = defineEmits(['isInvalid'])
</script>

<style scoped lang="scss">
#form-section {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
}
</style>