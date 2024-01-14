<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'network'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Register Dossier'" :segment="'header'" />
                <Typography :content="'It seems that you have not created a portfolio yet.'" :segment="'paragraph'" />
                <Typography :content="'Create one to share your work!'" :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Register'" :on-click="onContinue" />
            <Link :placeholder="'I will do this later...'" :href="onSkip" :segment="'designation'" />
            <Typography :content="'(By doing this you cannot share your content...)'" :segment="'designation'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Typography from '@/components/Typography.vue';
import Link from '@/components/Link.vue';
import { useRoute, useRouter } from 'vue-router';
import { useLoader } from '@/composables/useLoader';
import { storeToRefs } from 'pinia';
import { useSession } from '@/stores/useSession';
import { useLocalStorage } from '@/composables/useLocalStorage';
import { useDossier } from '@/stores/useDossier';
const router = useRouter();
const route = useRoute();
const { isLoading } = useLoader()
const { save } = useLocalStorage();
const { createDossier } = useDossier();
const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        await createDossier(route.params.userUuid as string, '');
        return router.push({ name: "dossier" })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => {
    return router.push(`/${route.params.userUuid as string}/dashboard`);
}
</script>

<style scoped lang="scss">
#wrapper {
    min-height: inherit;

    &__inner {
        padding: 0 2.5rem;
        min-height: inherit;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        text-align: center;

        &--text-block {
            display: flex;
            flex-direction: column;
            gap: 0.50rem;
        }
    }
}
</style>