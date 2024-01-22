<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner @editable-field-update="(data: string) => updateDossier({ designation: data })"
                    @toggle-visibility="(data: boolean) => updateDossier({ visible: data })"
                    @toggle-activity="(data: boolean) => updateDossier({ active: data })" :is-content-enabled="isActive"
                    :is-content-visible="isVisible" :header-content="user?.username + ' dossier'"
                    :sub-header-content="dossiers.find((dossier) => dossier.uuid === params.dossierUuid)?.designation ?? ''" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Books'" :segment="'designation'" />
                        <Icon :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'" :width="'1.25rem'"
                            :on-click="createBook" />
                    </div>
                    <Card v-for="book of books" :designation="book.designation" :description="book.description"
                        :is-visible="book.visible" :is-active="book.active" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import Card from "@/components/Card.vue";
import Icon from "@/components/Icon.vue";
import Navbar from "@/components/Navbar.vue"
import Typography from "@/components/Typography.vue";
import { useLoader } from "@/composables/useLoader";
import { useBook } from "@/stores/useBook";
import { useDossier } from "@/stores/useDossier";
import { useSession } from "@/stores/useSession";
import { useUser } from "@/stores/useUser";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const { isLoading } = useLoader();
const { push } = useRouter();
const { params } = useRoute();
const useBookStore = useBook();
const useDossierStore = useDossier();
const { dossiers } = storeToRefs(useDossierStore);
const { books } = storeToRefs(useBookStore);
const { user } = storeToRefs(useUser());

const dossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === params.dossierUuid))

const isVisible = computed(() => {
    if (dossier.value === undefined) return false;
    return dossier.value && dossier.value.visible;
})

const isActive = computed(() => {
    if (dossier.value === undefined) return false;
    return dossier.value && dossier.value.active;
})

const paramizedUserUuid = computed(() => ({ userUuid: user.value?.uuid }))

const updateDossier = async (data: Record<string, string | boolean>) => {
    try {
        isLoading.value = !isLoading.value;
        if (dossier.value === undefined) return push({ name: "dashboard", params: paramizedUserUuid.value  })
        await useDossierStore.updateDossierByUuid(dossier.value.uuid, data);
        if (dossier.value.active === false) push({ name: "dashboard", params: paramizedUserUuid.value })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
const createBook = async () => {
    if (!dossier.value) return

    await useBookStore.createBook({
        dossierUuid: dossier.value.uuid,
        designation: `Book #${books.value?.length}`,
        description: '',
    })
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
                gap: 1rem;

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