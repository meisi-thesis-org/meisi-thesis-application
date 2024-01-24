<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'pencil'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Recover Dossier'" :segment="'header'" />
                <Typography :content="'It seems that you have deactived your portfolio.'" :segment="'paragraph'" />
                <Typography :content="'Do you wish to recover it?'" :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Recover'" :on-click="onContinue" />
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
import { useUser } from '@/stores/useUser';

const router = useRouter();
const route = useRoute();
const { isLoading } = useLoader()
const useDossierStore = useDossier();
const useUserStore = useUser();
const { dossiers } = storeToRefs(useDossierStore);
const { user } = storeToRefs(useUserStore);

const dossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === route.params.dossierUuid))

const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        if (dossier.value === undefined) return router.push({ name: "dashboard", params: { userUuid: user.value?.uuid }  })
        await useDossierStore.updateDossierByUuid(dossier.value.uuid, { active: !dossier.value.active });
        return router.push({ name: "dossier", params: { dossierUuid: dossier.value.uuid } })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => router.push({ name: "dashboard", params: { userUuid: user.value?.uuid } });
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