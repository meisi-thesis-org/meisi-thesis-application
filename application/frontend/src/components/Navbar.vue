<template>
    <div id="navbar">
        <div id="navbar__inner">
            <Typography :content="'E-Bookler'" :segment="'brand'" />
            <div id="navbar__inner--icons">
                <Icon :name="'dashboard'" :height="'1.25rem'" :width="'1.25rem'" :on-click="navigateToDashboard" />
                <Icon :name="'library'" :height="'1.25rem'" :width="'1.25rem'" :on-click="navigateToLibrary" />
                <Icon :name="'dossier'" :height="'1.25rem'" :width="'1.25rem'" :on-click="navigateToDossier" />
                <Icon :name="'settings'" :height="'1.25rem'" :width="'1.25rem'" :on-click="navigateToSetting" />
                <Icon :name="'door'" :height="'1.25rem'" :width="'1.25rem'" :on-click="navigateAccessAcount" />
                <Divider :width="'0.025rem'" :height="'2rem'" />
                <Icon :name="'locale'" :height="'1.25rem'" :width="'1.25rem'" />
                <Icon :name="'theme'" :height="'1.25rem'" :width="'1.25rem'" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Divider from './Divider.vue';
import Icon from './Icon.vue';
import Typography from './Typography.vue';
import { storeToRefs } from 'pinia';
import { useSession } from '@/stores/useSession';
import { computed } from 'vue';
import { useDossier } from '@/stores/useDossier';

const router = useRouter();
const useSessionStore = useSession();
const { session } = storeToRefs(useSessionStore);
const { dossiers } = storeToRefs(useDossier());

const dossier = computed(() => dossiers.value.find((dossier) => dossier.userUuid === session.value?.userUuid))

const navigateToDashboard = async () => await router.push({ name: "dashboard", params: { userUuid: session.value!.userUuid } })
const navigateToLibrary = async () => await router.push({ name: "library", params: { userUuid: session.value!.userUuid } })
const navigateToDossier = async () => await router.push({ name: "dossier", params: { userUuid: session.value!.userUuid, dossierUuid: dossier.value?.uuid } })
const navigateToSetting = async () => await router.push({ name: "setting", params: { userUuid: session.value!.userUuid } })
const navigateAccessAcount = async () => {
    await useSessionStore.signOut()
    await router.push({ name: "access-account" })
}
</script>

<style scoped lang="scss">
#navbar {
    height: 7.5rem;
    box-shadow: 0 0 0.05rem 0rem currentColor;

    &__inner {
        height: inherit;
        padding: 0 1.25rem;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &--search {
            width: 100%;
            max-width: 35%;
        }

        @media(min-width:520px) {
            &--search {
                max-width: 50%;
            }
        }

        &--icons {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.25rem;
        }
    }
}
</style>