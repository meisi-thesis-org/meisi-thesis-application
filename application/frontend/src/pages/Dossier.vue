<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :is-content-enabled="isActive" :is-content-visible="isVisible"
                    :header-content="user?.username + ' dossier'" :sub-header-content="subHeaderContent"
                    :is-header-editable="false"
                    @editable-field-update="(data: string) => updateDossier({ designation: data })"
                    @toggle-visibility="(data: boolean) => updateDossier({ visible: data })"
                    @toggle-activity="(data: boolean) => updateDossier({ active: data })" />
                <div id="wrapper__inner--content__box">
                    <div id="wrapper__inner--content__box--row">
                        <Typography :content="'Books'" :segment="'designation'" />
                        <Icon v-if="isProducer" :name="'plus'" :color="'blue-colorized'" :height="'1.25rem'" :width="'1.25rem'"
                            :on-click="createBook" />
                    </div>
                    <Card v-for="book of books" :designation="book.designation" :description="book.description"
                        :is-visible="book.visible" :is-active="book.active" @click="navigateToBook(book.uuid)" />
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
import { usePermission } from "@/composables/usePermission";
import { useBook } from "@/stores/useBook";
import { useDossier } from "@/stores/useDossier";
import { useUser } from "@/stores/useUser";
import type { UserEntity } from "@/types/Entities";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const useBookStore = useBook();
const useDossierStore = useDossier();
const useUserStore = useUser();
const { isLoading } = useLoader();
const { dossiers } = storeToRefs(useDossierStore);
const { books } = storeToRefs(useBookStore);
const { isProducer } = usePermission()

const user = ref<UserEntity>();

onMounted(async () => {
    if (dossier.value) user.value = await useUserStore.findUserByUuid(dossier.value.userUuid);
})

const dossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === route.params.dossierUuid))
const isVisible = computed(() => (dossier.value && dossier.value.visible) ?? false)
const isActive = computed(() => (dossier.value && dossier.value.active) ?? false)
const subHeaderContent = computed(() => dossier.value?.designation ?? '')

const updateDossier = async (data: Record<string, string | boolean>) => {
    try {
        isLoading.value = !isLoading.value;
        await useDossierStore.updateDossierByUuid(dossier.value!.uuid, data);
        if (!isActive.value) router.push({ name: "dashboard", params: { userUuid: route.params.userUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}
const createBook = async () => {
    await useBookStore.createBook({
        dossierUuid: dossier.value!.uuid,
        designation: `Book #${books.value?.length}`,
        description: '',
    })
}

const navigateToBook = (bookUuid: string) => router.push({ name: 'book', params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: bookUuid } })
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