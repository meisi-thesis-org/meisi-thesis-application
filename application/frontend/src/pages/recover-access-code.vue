<template>
    <div id="container">
        <Form :form-header="formHeader" :form-sections="formSections" :buttons="formButtons" :links="formLinks"
            :on-submit="onSubmit" />
    </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/components/atoms/button/Button.type";
import type { LinkProps } from "@/components/atoms/link/Link.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type";
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";
import Form from "@/components/organisms/form/Form.vue";
import { email } from "@vuelidate/validators";

const onSubmit = () => { }

const formHeader: FormHeaderProps = { header: 'E-Bookler', subHeader: 'Start typing on E-Bookler to monetize your content' }
const formSections: Array<FormSectionProps> = [
    {
        designation: "Account Information",
        formControls: [
            { name: 'email', type: 'email', placeholder: 'Email...', rules: { email } },
            { name: 'username', type: 'text', placeholder: 'Username...', rules: {} },
            { name: 'phoneNumber', type: 'text', placeholder: 'PhoneNumber...', rules: { } },
        ]
    }
]
const formButtons: Array<ButtonProps> = [{ type: 'submit', content: 'Continue' }]
const formLinks: Array<LinkProps> = [{ content: 'No Account? Create one here!', href: "/sign-up" }, { content: 'Account already exists? Enter here!', href: "/sign-in" }]
</script>

<style scoped lang="scss">
#container {
    min-height: 100vh;
}
</style>