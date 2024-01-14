<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner @on-blur="updateDossier" :header-content="user?.username + ' dossier'"
                    :sub-header-content="dossier?.designation ?? ''" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Books'" :segment="'designation'" />
                        <Icon :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'" :width="'1.25rem'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import Icon from "@/components/Icon.vue";
import Navbar from "@/components/Navbar.vue"
import Typography from "@/components/Typography.vue";
import { useLoader } from "@/composables/useLoader";
import { useDossier } from "@/stores/useDossier";
import { useUser } from "@/stores/useUser";
import { storeToRefs } from "pinia";
const { updateDossierByUuid } = useDossier();
const { dossier } = storeToRefs(useDossier());
const { user } = storeToRefs(useUser());
const { isLoading } = useLoader();
const updateDossier = async (data: FocusEvent) => {
    try {
        const target = data.target as unknown as { value: string };
        if (target.value === dossier.value?.designation) return;
        isLoading.value = !isLoading.value;
        await updateDossierByUuid(dossier.value!.uuid, { designation: target.value });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
</script>

<style scoped lang="scss">
#wrapper {
    &__inner {
        &--content {
            &__box {
                padding: 2.5rem;
                display: flex;
                flex-direction: column;

                &--row {
                    display: inherit;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
    }
}
</style>