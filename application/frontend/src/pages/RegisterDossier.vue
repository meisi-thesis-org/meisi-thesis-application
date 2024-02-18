<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'pencil'" :height="'5rem'" :width="'5rem'" />
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
import { useDossier } from '@/stores/useDossier';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { push } = useRouter();
const { params } = useRoute();
const { isLoading } = useLoader()
const useDossierStore = useDossier();
const { dossiers } = storeToRefs(useDossierStore);

const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === params.userUuid));

const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        await useDossierStore.createDossier(params.userUuid as string, '', 0);
        return push({ name: "dossier", params: { userUuid: params.userUuid, dossierUuid: dossier.value?.uuid } })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => push({ name: "dashboard", params: { userUuid: params.userUuid }});
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