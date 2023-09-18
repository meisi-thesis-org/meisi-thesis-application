<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent :header="'E-Bookler'" :sub-header="'Start monetizing your writting time!'"
                :form-group-collection="formGroupCollection" :submit-label="'Continue'" :submit-action="signUp"
                :link-collection="linkCollection"></FormComponent>
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
import { useHttp } from "./../../composables/use-http.composable";

const { doRequest } = useHttp();
const { push } = useRouter();

const formGroupCollection = new Array<FormGroupComponentProps>(
    {
        name: "Account Information",
        formControlCollection: [
            {
                type: 'email',
                placeholder: 'Email...',
                required: true
            },
            {
                type: 'text',
                placeholder: 'Username...',
                required: true
            },
            {
                type: 'text',
                placeholder: 'Phone Number...',
                required: true
            }
        ]
    },
    {
        name: "User Information",
        formControlCollection: [
            {
                type: 'text',
                placeholder: 'Name...',
                required: true
            },
            {
                type: 'date',
                placeholder: 'Date of Birth...',
                required: true
            }
        ]
    }
);

const linkCollection = new Array<LinkComponentProps>(
    {
        path: '/sign-in',
        content: 'Already have an account? Sign In here!'
    }
)

const signUp = async (event: any) => {
    try {
        const data: Record<string, string> = {
            email: event.target[0].value,
            username: event.target[1].value,
            phoneNumber: event.target[2].value,
            name: event.target[3].value,
            dateBirth: new Date(event.target[4].value).toISOString()
        }

        await doRequest('POST', '/security/users', data)
        await push('/sign-in')    
    } catch (error) {
        throw error;
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
}
</style>