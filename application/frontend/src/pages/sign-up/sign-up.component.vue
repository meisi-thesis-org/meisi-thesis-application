<template>
    <div class="container">
        <div class="container__inner">
            <FormComponent
                :header="'E-Bookler'"
                :sub-header="'Start monetizing your writting time!'"
                :button-label="'Create Account'"
                :button-action="signUp"
                :form-group-collection="formGroupCollection"
                :link-collection="linkCollection"
            ></FormComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FormGroupProps } from '../../components/molecules/form-group';
    import { LinkProps } from '../../components/molecules/link';
    import { FormComponent } from '../../components/organisms/form';

    const formGroupCollection = new Array<FormGroupProps>(
        {
            name: "Account Information",
            formControlCollection: [
                {
                    type: 'email',
                    placeholder: 'Email...'
                },
                {
                    type: 'text',
                    placeholder: 'Username...'
                },
                {
                    type: 'text',
                    placeholder: 'Phone Number...'
                }
            ]
        },
        {
            name: "User Information",
            formControlCollection: [
                {
                    type: 'text',
                    placeholder: 'Name...'
                },
                {
                    type: 'date',
                    placeholder: 'Date of Birth...'
                }
            ]
        }
    );
    
    const linkCollection = new Array<LinkProps>(
        {
            path: '/sign-in',
            content: 'Already have an account? Sign in now'
        },
    )

    const signUp = () => {}
</script>

<style scoped>
    .container {
        width: 100vw;
        height: 100vh;
    }
</style>