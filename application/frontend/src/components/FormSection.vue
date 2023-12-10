<template>
    <div id="form-section">
        <Typography :content="definedProps.designation" :segment="'designation'" />
        <div id="form-section__controls">
            <FormControl v-for="formControl of definedProps.formControls" :type="formControl.type"
                :placeholder="formControl.placeholder" :rules="formControl.rules" :name="formControl.name"
                @is-invalid="(errors) => $emit('isInvalid', errors)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormSectionProps } from '@/types/FormSection';
import Typography from './Typography.vue';
import FormControl from './FormControl.vue';

const definedProps = defineProps<FormSectionProps>()
const definedEmits = defineEmits(['isInvalid'])
</script>

<style scoped lang="scss">
#form-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &__controls {
        display: inherit;
        flex-direction: inherit;
        gap: 0.25rem;
    }
}
</style>