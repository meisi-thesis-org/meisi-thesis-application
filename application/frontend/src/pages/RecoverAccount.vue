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
import { email } from "@vuelidate/validators"
import { useLoader } from "@/composables/useLoader";
import { useRouter } from "vue-router";
import { useUser } from "@/stores/useUser";

const router = useRouter();
const { isLoading } = useLoader()
const { updateUserAccessCode } = useUser()
const onSubmit = async (event: Event) => {
    try {
        isLoading.value = !isLoading.value;
        const targetElements = (event.target as any).elements;
        const recoverAccountRecord: Record<string, string> = {};

        for (const targetElement of targetElements) {
            if (targetElement.name) {
                recoverAccountRecord[targetElement.name] = targetElement.value;
            }
        }

        await updateUserAccessCode(recoverAccountRecord);
        isLoading.value = !isLoading.value;
        return router.push('/access-account')
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const formHeader = computed<FormHeaderProps>(() => ({ header: "E-Bookler", subHeader: "Create an account to start monetizing your content." }))
const formSections = computed<Array<FormSectionProps>>(() => ([
    {
        designation: "Account Information",
        formControls: [
            { name: "username", placeholder: "Username...", type: "text", rules: {} },
            { name: "email", placeholder: "Email...", type: "email", rules: { email } },
            { name: "phoneNumber", placeholder: "PhoneNumber...", type: "text", rules: {} },
        ]
    },
]))
const formAction = computed<FormActionProps>(() => ({
    buttons: [
        { placeholder: "Continue" }
    ],
    links: [
        { placeholder: "Already have an account? Acess here!", href: "/access-code" },
        { placeholder: "No account? Create one here!", href: "/create-account" },
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