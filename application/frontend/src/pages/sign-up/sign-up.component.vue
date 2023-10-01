<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent :header="'E-Bookler'" :sub-header="'Start monetizing your writting time!'"
                :form-group-collection="formGroupCollection" :submit-label="'Continue'" :submit-action="onSubmit"
                :link-collection="linkCollection" :has-error="submitActionError"></FormComponent>
            <DividerComponent :width="'100%'" :height="'0.05rem'"></DividerComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { DividerComponent } from "../../components/atoms/divider";
import { FormGroupComponentProps } from "../../components/molecules/form-group";
import { LinkComponentProps } from "../../components/molecules/link";
import { FormComponent } from "./../../components/organisms/form";
import { useUserStore } from "./../../store/use-user.store";
import { ref } from "vue";

const { createUser } = useUserStore();
const { push } = useRouter();


const formGroupCollection = new Array<FormGroupComponentProps>(
    {
        name: "Account Information",
        formControlCollection: [
            {
                type: 'email',
                placeholder: 'Email...',
                required: true,
                autocomplete: 'email'
            },
            {
                type: 'text',
                placeholder: 'Username...',
                required: true,
                autocomplete: 'username'
            },
            {
                type: 'text',
                placeholder: 'Phone Number...',
                required: true,
                autocomplete: 'mobile'
            }
        ]
    },
    {
        name: "User Information",
        formControlCollection: [
            {
                type: 'text',
                placeholder: 'Name...',
                required: true,
                autocomplete: 'name'
            },
            {
                type: 'date',
                placeholder: 'Date of Birth...',
                required: true,
                autocomplete: 'bday'
            }
        ]
    }
);

const linkCollection = new Array<LinkComponentProps>(
    {
        path: '/sign-in',
        content: 'Already have an account? Sign In here!'
    },
    {
        path: '/refresh-access-code',
        content: 'Forgot your account data? Refresh it here!'
    }
)

const submitActionError = ref<boolean>(false);

const onSubmit = async (event: any) => {
    try {
        const data: Record<string, string> = {
            email: event.target[0].value,
            username: event.target[1].value,
            phoneNumber: event.target[2].value,
            name: event.target[3].value,
            dateBirth: new Date(event.target[4].value).toISOString()
        }

        await createUser(data);
        await push('/sign-in')    
    } catch (error) {
        submitActionError.value = true
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    min-height: inherit;

    &--inner {
        min-height: inherit;
    }
}
</style>