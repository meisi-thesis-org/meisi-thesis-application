<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Form :form-header="formHeader" :form-sections="formSections" :form-action="formAction" :on-submit="onSubmit" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Form from "@/components/Form.vue"
import type { FormActionProps } from "@/types/FormAction";
import type { FormHeaderProps } from "@/types/FormHeader";
import type { FormSectionProps } from "@/types/FormSection";
import { computed } from "vue";
import { required } from "@vuelidate/validators"
import { useRouter } from "vue-router";
import { useUser } from "@/stores/useUser";
import { useSession } from "@/stores/useSession";
const router = useRouter();
const { findUserByAcessCode } = useUser()
const { signIn } = useSession()

const formHeader = computed<FormHeaderProps>(() => ({ header: "E-Bookler", subHeader: "Create an account to start monetizing your content." }))
const formSections = computed<Array<FormSectionProps>>(() => ([
    {
        designation: "Account Information",
        formControls: [
            { name: "acessCode", placeholder: "AcessCode...", type: "text", rules: { required } },
        ]
    },
]))
const formAction = computed<FormActionProps>(() => ({
    buttons: [
        { placeholder: "Continue" }
    ],
    links: [
        { placeholder: "No account? Create one here!", href: "/create-account" },
        { placeholder: "Forgot your access code? Recover it here", href: "/recover-account" },
    ]
}))
const onSubmit = async (event: Event) => await signIn((event.target as any)[0].value)
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