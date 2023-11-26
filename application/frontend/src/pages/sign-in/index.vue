<template>
    <div id="wrapper">
        <div id="wrapper__innner">
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
                { type: 'password', placeholder: 'Access Code...', rules: ['required'] }
            ]
        }
    ),
    formActions: {
        formButtons: new Array(
            { content: 'Continue' }
        ),
        formLinks: new Array(
            { content: 'No Account? Create an account here!', href: '/sign-up' },
            { content: 'Forgot AccessCode? Refresh it here!', href: '/refresh-access-code' },
        ),
    }
})

</script>

<style scoped lang="scss"></style>