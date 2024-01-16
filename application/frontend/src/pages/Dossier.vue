<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner @editable-field-update="(data: string) => updateDossier({ designation: data })"
                    @toggle-visibility="(data: boolean) => updateDossier({ visible: data })"
                    @toggle-activity="(data: boolean) => updateDossier({ active: data })" 
                    :is-content-enabled="isEnabled"
                    :is-content-visible="isVisible"
                    :header-content="user?.username + ' dossier'" :sub-header-content="dossier?.designation ?? ''" />
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
import { computed } from "vue";
import { useRouter } from "vue-router";
const { updateDossierByUuid } = useDossier();
const { dossier } = storeToRefs(useDossier());
const { user } = storeToRefs(useUser());
const { isLoading } = useLoader();
const { push } = useRouter();
const isVisible = computed(() => (dossier.value && dossier.value.visible) ?? false)
const isEnabled = computed(() => (dossier.value && dossier.value.active) ?? false)
const updateDossier = async (data: Record<string, string | boolean>) => {
    try {
        isLoading.value = !isLoading.value;
        await updateDossierByUuid(dossier.value!.uuid, data);
        if (dossier.value?.active === false) push({ name: "dashboard", params: { userUuid: user.value?.uuid } })
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