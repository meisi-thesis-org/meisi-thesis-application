<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent 
                :header="'E-Bookler'" 
                :sub-header="'Start monetizing your writting time!'"
                :form-group-collection="formGroupCollection"
                :submit-label="'Continue'" 
                :submit-action="signIn" 
                :link-collection="linkCollection"
            ></FormComponent>
            <DividerComponent :width="'100%'" :height="'0.05rem'"></DividerComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DividerComponent } from "../../components/atoms/divider";
import { FormGroupComponentProps } from "../../components/molecules/form-group";
import { LinkComponentProps } from "../../components/molecules/link";
import { FormComponent } from "./../../components/organisms/form";

const formGroupCollection = new Array<FormGroupComponentProps>(
    {
        name: "Account Information",
        formControlCollection: [
            {
                type: 'password',
                placeholder: 'Bookler Key...',
                required: true
            }
        ]
    }
);

const linkCollection = new Array<LinkComponentProps>(
    {
        path: '/sign-up',
        content: 'No account? Register here!'
    },
    {
        path: '/refresh-access-code',
        content: 'Forgot your account data? Recover here!'
    }
)

const signIn = (event: any) => {
    const accessCode = event.target[0].value;
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
}
</style>