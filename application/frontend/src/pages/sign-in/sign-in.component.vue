<template>
    <div class="container">
        <div class="container--inner">
            <FormComponent :header="'E-Bookler'" :sub-header="'Start monetizing your writting time!'"
                :has-error="submitActionError" :form-group-collection="formGroupCollection" :submit-label="'Continue'"
                :submit-action="onSubmit" :link-collection="linkCollection"></FormComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FormGroupComponentProps } from "../../components/molecules/form-group";
import { LinkComponentProps } from "../../components/molecules/link";
import { FormComponent } from "./../../components/organisms/form";
import { UserEntity } from "./../../types/entities";
import { useUserStore } from "../../store/use-user.store";
import { useSessionStore } from "../../store/use-session.store";
import { useRouter } from "vue-router";
import { ref } from "vue";

const { findUserByAccessCode } = useUserStore();
const { createSession } = useSessionStore();
const { push } = useRouter();


const formGroupCollection = new Array<FormGroupComponentProps>(
    {
        name: "Account Information",
        formControlCollection: [
            {
                type: 'password',
                placeholder: 'Bookler Key...',
                required: true,
                autocomplete: 'username current-password'
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
        content: 'Forgot your account data? Refresh it here!'
    }
)

const submitActionError = ref<boolean>(false);

const onSubmit = async (event: any) => {
    try {
        const accessCode = event.target[0].value;
        const userEntity: UserEntity = await findUserByAccessCode(accessCode);
        await createSession(userEntity.uuid);
        await push('/dashboard');
    } catch (error) {
        submitActionError.value = true
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
}
</style>