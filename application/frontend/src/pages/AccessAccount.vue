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
import { useSession } from "@/stores/useSession";
import { useLoader } from "@/composables/useLoader";
import { useRouter } from "vue-router";

const { isLoading } = useLoader()
const { signIn } = useSession()
const router = useRouter()
const onSubmit = async (event: Event) => {
    try {
        isLoading.value = !isLoading.value;
        await signIn((event.target as any)[0].value);
        return router.push('/dashboard')
    } finally {
        isLoading.value = !isLoading.value;
    }
}

const formHeader = computed<FormHeaderProps>(() => ({ header: "E-Bookler", subHeader: "Create an account to start monetizing your content." }))
const formSections = computed<Array<FormSectionProps>>(() => ([
    {
        designation: "Account Information",
        formControls: [
            { name: "acessCode", placeholder: "AcessCode...", type: "password", rules: { required } },
        ]
    },
]))
const formAction = computed<FormActionProps>(() => ({
    buttons: [
        { placeholder: "Continue" }
    ],
    links: [
        { placeholder: "No account? Create one here!", segment: 'designation', href: () => router.push("/create-account") },
        { placeholder: "Forgot your access code? Recover it here", segment: 'designation',  href: () => router.push("/recover-account") },
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