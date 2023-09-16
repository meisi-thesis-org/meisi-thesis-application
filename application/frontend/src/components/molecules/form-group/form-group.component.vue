<template>
    <div class="form-group">
        <div class="form-group__inner">
            <TypographyComponent 
                :content="definedProps.name" 
                :segment="'label'"
            ></TypographyComponent>
            <FormFieldComponent 
                v-for="formField of definedProps.formFieldCollection"
                :type="formField.type"
                :placeholder="formField.placeholder"
            ></FormFieldComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { TypographyComponent } from "./../../atoms/typography";
    import { FormFieldComponent } from "./../../atoms/form-field";
    import { FormGroupProps } from ".";

    const definedProps = defineProps<FormGroupProps>()
</script>

<style scoped lang="scss">
    .form-group{
        &__inner {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }
</style>