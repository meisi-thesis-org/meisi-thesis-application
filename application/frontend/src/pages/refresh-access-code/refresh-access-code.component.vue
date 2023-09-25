<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent :header="'E-Bookler'" :sub-header="'Start monetizing your writting time!'"
                :form-group-collection="formGroupCollection" :submit-label="'Continue'" :submit-action="onSubmit"
                :link-collection="linkCollection"></FormComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { FormGroupComponentProps } from '../../components/molecules/form-group';
import { FormComponent } from '../../components/organisms/form';
import { LinkComponentProps } from '../../components/molecules/link';
import { useUserStore } from '../../store/use-user.store';

const { updateAccessCode } = useUserStore()
const { push } = useRouter();

const formGroupCollection = new Array<FormGroupComponentProps>(
    {
        name: "Account Information",
        formControlCollection: [
            {
                type: 'email',
                placeholder: 'Email...',
                required: false,
                autocomplete: 'email'
            },
            {
                type: 'text',
                placeholder: 'Username...',
                required: false,
                autocomplete: 'username'
            },
            {
                type: 'text',
                placeholder: 'Phone Number...',
                required: false,
                autocomplete: 'mobile'
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
        path: '/sign-in',
        content: 'Already have an account? Access here!'
    }
)

const onSubmit = async (event: any) => {
    const data: Record<string, string | undefined> = {
        email: event.target[0].value,
        username: event.target[1].value,
        phoneNumber: event.target[2].value,
    };

    await updateAccessCode(data);
    await push('/sign-in');
}
</script>

<style scoped lang="scss"></style>