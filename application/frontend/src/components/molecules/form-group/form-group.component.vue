<template>
    <div class="form-group">
        <div class="form-group__inner">
            <TypographyComponent 
                :content="definedProps.name" 
                :segment="'label'"
            ></TypographyComponent>
            <FormField 
                v-for="formField of definedProps.formFieldCollection"
                :form-field="formField"
            ></FormField>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { TypographyComponent } from "./../../atoms/typography";
    import { FormGroup } from ".";

    const definedProps = defineProps<FormGroup>()
</script>

<style scoped lang="scss"></style>