<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent
                :header="'E-Bookler'"
                :sub-header="'Start monetizing your writting time!'"
                :button-label="'SignIn'"
                :button-action="signIn"
                :form-group-collection="formGroupCollection"
                :link-collection="linkCollection"
            ></FormComponent>
            <DividerComponent :width="'100%'" :height="'0.05rem'"></DividerComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { DividerComponent } from "../../components/atoms/divider";
    import { FormGroupProps } from "../../components/molecules/form-group";
    import { LinkProps } from "../../components/molecules/link/link.component.type";
    import { FormComponent } from "./../../components/organisms/form";
    
    const formGroupCollection = new Array<FormGroupProps>(
        {
            name: "Account Information",
            formFieldCollection: [
                {
                    type: 'password',
                    placeholder: 'Bookler Key...'
                }
            ]
        }
    );
    
    const linkCollection = new Array<LinkProps>(
        {
            path: '/sign-up',
            content: 'Don’t have an account? Register here!'
        },
        {
            path: '/refresh-access-code',
            content: 'Forgot your account data? Recover here!' 
        }
    )

    const signIn = () => {}
</script>

<style scoped lang="scss">
    .container {
        width: 100vw;
        height: 100vh;
    }
</style>