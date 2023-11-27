<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Form :form-groups="defineFormProps.formGroups" :form-actions="defineFormProps.formActions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormProps } from "@/components/organisms/Form/Form.type";
import Form from "@/components/organisms/Form/Form.vue"

const defineFormProps: FormProps = ({
    formGroups: new Array(
        {
            designation: 'Account Information',
            formControls: [
                { type: 'email', placeholder: 'Email...', rules: ['required'] },
                { type: 'text', placeholder: 'Username...', rules: ['required'] },
                { type: 'text', placeholder: 'Phone Number...', rules: ['required'] }
            ]
        },
        {
            designation: 'Personal Information',
            formControls: [
                { type: 'text', placeholder: 'Name...', rules: ['required'] },
                { type: 'date', placeholder: 'Birth Date...', rules: ['required'] }
            ]
        }
    ),
    formActions: {
        formButtons: new Array(
            { content: 'Continue' }
        ),
        formLinks: new Array(
            { content: 'Already have an account? Click here to access your account!', href: '/sign-up' },
            { content: 'Forgot AccessCode? Refresh it here!', href: '/refresh-access-code' },
        ),
    }
})

</script>

<style scoped lang="scss">
#wrapper {
    min-height: inherit;

    &__inner {
        min-height: inherit;
    }
}
</style>