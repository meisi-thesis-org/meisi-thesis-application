<template>
    <div id="container">
        <Form :form-header="formHeader" :form-sections="formSections" :form-action="formAction" :on-submit="onSubmit" />
    </div>
</template>

<script setup lang="ts">
import type { FormActionProps } from "@/components/molecules/form-action/FormAction.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type";
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";
import Form from "@/components/organisms/form/Form.vue";

const onSubmit = () => { }

const formHeader: FormHeaderProps = { header: 'E-Bookler', subHeader: 'Start typing on E-Bookler to monetize your content' }
const formSections: Array<FormSectionProps> = [
    {
        designation: "Account Information",
        formControls: [
            { name: 'email', type: 'email', placeholder: 'Email...' },
            { name: 'username', type: 'text', placeholder: 'Username...' },
            { name: 'phoneNumber', type: 'text', placeholder: 'PhoneNumber...' },
        ]
    },
    {
        designation: "Personal Information",
        formControls: [
            { name: 'name', type: 'text', placeholder: 'Name...' },
            { name: 'dateBirth', type: 'date', placeholder: 'Date Birth...' },
        ]
    }
]
const formAction: FormActionProps = { buttons: [{ type: 'submit', content: 'Continue' }], links: [{ content: 'Account already exists? Enter here!', href: "/sign-in" }, { content: 'Forgot AcessCode? Recover it here!', href: "/recover-access-code" }] }
</script>

<style scoped lang="scss">
#container {
    min-height: 100vh;
}
</style>