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
import { useDevice } from "@/stores/useDevice";

const router = useRouter();
const { isLoading } = useLoader()
const { session, signIn } = useSession()
const { devices, findDevicesByUserUuid } = useDevice()
const onSubmit = async (event: Event) => {
    try {
        isLoading.value = !isLoading.value;
        await signIn((event.target as any)[0].value);
        isLoading.value = !isLoading.value;
        await findDevicesByUserUuid(session.userUuid)

        console.log(devices)
        // return router.push('/check-device')
    } catch (error) {
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
        { placeholder: "No account? Create one here!", href: "/create-account" },
        { placeholder: "Forgot your access code? Recover it here", href: "/recover-account" },
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