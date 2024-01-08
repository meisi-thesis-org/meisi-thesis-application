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
import { required, email } from "@vuelidate/validators"
import { useUser } from "@/stores/useUser";
import { useRouter } from "vue-router";
import { useLoader } from "@/composables/useLoader";

const router = useRouter();
const { isLoading } = useLoader()
const { createUser } = useUser()
const onSubmit = async (event: Event) => {
    try {
        isLoading.value = !isLoading.value;
        const targetElements = (event.target as any).elements;
        const createAccountRecord: Record<string, string> = {};

        for (const targetElement of targetElements) {
            if (targetElement.name) {
                createAccountRecord[targetElement.name] = targetElement.value;
            }
        }

        await createUser(createAccountRecord);
        isLoading.value = !isLoading.value;
        return router.push('/access-account')
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
};

const formHeader = computed<FormHeaderProps>(() => ({ header: "E-Bookler", subHeader: "Create an account to start monetizing your content." }))
const formSections = computed<Array<FormSectionProps>>(() => ([
    {
        designation: "Account Information",
        formControls: [
            { name: "username", placeholder: "Username...", type: "text", rules: { required } },
            { name: "email", placeholder: "Email...", type: "email", rules: { required, email } },
            { name: "phoneNumber", placeholder: "PhoneNumber...", type: "number", rules: { required } },
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
        { placeholder: "Already have an account? Acess here!", segment: 'designation', href: () => router.push("/access-account") },
        { placeholder: "Forgot your access code? Recover it here!", segment: 'designation',  href: () => router.push("/recover-account") },
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