<template>
    <div id="navbar">
        <div id="navbar__inner">
            <Typography :content="'E-Bookler'" :segment="'brand'" />
            <div id="navbar__inner--search">
                <FormControl :name="'search'" :placeholder="'Search...'" :type="'text'" :rules="[]" :hide-alerts="true" />
            </div>
            <div id="navbar__inner--icons">
                <Icon :name="'dashboard'" :height="'1.25rem'" :width="'1.25rem'" />
                <Icon :name="'dossier'" :height="'1.25rem'" :width="'1.25rem'" :onClick="navigateToDossier" />
                <Icon :name="'settings'" :height="'1.25rem'" :width="'1.25rem'" />
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
import FormControl from './FormControl.vue';
import Icon from './Icon.vue';
import Typography from './Typography.vue';
import { storeToRefs } from 'pinia';
import { useSession } from '@/stores/useSession';
const { push } = useRouter();
const { session } = storeToRefs(useSession());
const navigateToDossier = async () => await push({ name: "dossier", params: { userUuid: session.value?.userUuid} })
</script>

<style scoped lang="scss">
#navbar {
    height: 5rem;

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