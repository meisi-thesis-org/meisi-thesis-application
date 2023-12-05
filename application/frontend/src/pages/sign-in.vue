<template>
    <div id="container">
        <Form :form-header="formHeader" :form-sections="formSections" :buttons="formButtons" :links="formLinks" :on-submit="onSubmit" />
    </div>
</template>

<script setup lang="ts">
import type { ButtonProps } from "@/components/atoms/button/Button.type";
import type { LinkProps } from "@/components/atoms/link/Link.type";
import type { FormHeaderProps } from "@/components/molecules/form-header/FormHeader.type";
import type { FormSectionProps } from "@/components/molecules/form-section/FormSection.type";
import Form from "@/components/organisms/form/Form.vue";
import { required } from '@vuelidate/validators'

const formHeader: FormHeaderProps = { header: 'E-Bookler', subHeader: 'Start typing on E-Bookler to monetize your content' }
const formSections: Array<FormSectionProps> = [{ designation: "Account Information", formControls: [{ name: 'accessCode', type: 'password', placeholder: 'Access Code...', rules: { required } }] }]
const formButtons: Array<ButtonProps> = [{ type: 'submit', content: 'Continue' }]
const formLinks: Array<LinkProps> = [{ content: 'No Account? Create one here!', href: "/sign-up" }, { content: 'Forgot AcessCode? Recover it here!', href: "/recover-access-code" }]
const onSubmit = () => {}

</script>

<style scoped lang="scss">
#container {
    min-height: 100vh;
}
</style>