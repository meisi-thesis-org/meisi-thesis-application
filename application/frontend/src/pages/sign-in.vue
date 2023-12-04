<template>
    <div id="container">
        <Form :form-header="formHeader" :form-sections="formSections" />
    </div>
</template>

<script setup lang="ts">
import type { FormControlProps } from "@/components/atoms/form-control/FormControl.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type";
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";
import Form from "@/components/organisms/form/Form.vue";

const formHeader: FormHeaderProps = { header: 'E-Bookler', subHeader: 'Start typing on E-Bookler to monetize your content' }
const formControls: Array<FormControlProps> = [{ name: 'accessCode', type: 'password', placeholder: 'Access Code...' }]
const formSections: Array<FormSectionProps> = [{ designation: "Account Information", formControls }]
</script>

<style scoped lang="scss">
#container {
    min-height: 100vh;
}
</style>