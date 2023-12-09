<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Form :form-header="formHeader" :form-sections="formSections" :form-action="formAction" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Form from "@/components/Form.vue"
import type { FormActionProps } from "@/types/FormAction";
import type { FormHeaderProps } from "@/types/FormHeader";
import type { FormSectionProps } from "@/types/FormSection";
import { computed } from "vue";
import { required, email } from "@vuelidate/validators"

const formHeader = computed<FormHeaderProps>(() => ({ header: "E-Bookler", subHeader: "Create an account to start monetizing your content." }))
const formSections = computed<Array<FormSectionProps>>(() => ([
    {
        designation: "Account Information",
        formControls: [
            { name: "username", placeholder: "Username...", type: "text", rules: { required } },
            { name: "email", placeholder: "Email...", type: "email", rules: { required, email } },
            { name: "phoneNumber", placeholder: "PhoneNumber...", type: "text", rules: { required } },
        ]
    },
    {
        designation: "Personal Information", formControls: [
            { name: "name", placeholder: "Name...", type: "text", rules: { required } },
            { name: "dateBirth", placeholder: "DateBirth...", type: "date", rules: { required } },
        ]
    },
]))
const formAction = computed<FormActionProps>(() => ({
    buttons: [
        { placeholder: "Continue" }
    ],
    links: [
        { placeholder: "Already have an account? Enter here!", href: "/enter-account" },
        { placeholder: "Forgot your access code? Recover it here!", href: "/recover-account" },
    ]
}))
</script>

<style scoped lang="scss">
#wrapper {
    min-height: inherit;

    &__inner {
        min-height: inherit;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>