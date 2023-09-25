<template>
    <div class="form-group">
        <div class="form-group__inner">
            <TypographyComponent :content="definedProps.name" :segment="'label'"></TypographyComponent>
            <FormControlComponent 
                v-for="formControl of definedProps.formControlCollection" 
                :type="formControl.type"
                :placeholder="formControl.placeholder"
                :value="formControl.value"
                :required="formControl.required"
                :autocomplete="formControl.autocomplete"
            ></FormControlComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TypographyComponent } from "./../../atoms/typography";
import { FormControlComponent } from "../../atoms/form-control";
import { FormGroupComponentProps } from ".";

const definedProps = defineProps<FormGroupComponentProps>()
</script>

<style scoped lang="scss">
.form-group {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>