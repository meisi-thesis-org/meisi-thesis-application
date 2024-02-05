<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :is-content-enabled="isActive" :is-content-visible="isVisible" :header-content="page?.designation!"
                    :is-header-editable="true" :show-editable-field="false"
                    @editable-control-update="(data: string) => updatePage({ designation: data })"
                    @toggle-visibility="(data: boolean) => updatePage({ visible: data })"
                    @toggle-activity="(data: boolean) => updatePage({ active: data })" />
                <EditableField :content="subHeaderContent" :max-length="'1500'" :is-editable="isOwner(route.params.userUuid as string)"
                    @on-blur="(data: string) => updatePage({ description: data })" />
            </div>
        </div>
    </div>
</template>
    
<script setup lang="ts">
import Banner from "@/components/Banner.vue";
import EditableField from "@/components/EditableField.vue";
import Navbar from "@/components/Navbar.vue"
import { useLoader } from "@/composables/useLoader";
import { usePermission } from "@/composables/usePermission";
import { usePage } from "@/stores/usePage";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const usePageStore = usePage();
const { isLoading } = useLoader();
const { isOwner } = usePermission();
const { pages } = storeToRefs(usePageStore);

const page = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid))
const isVisible = computed(() => (page.value && page.value.visible) ?? false)
const isActive = computed(() => (page.value && page.value.active) ?? false)
const subHeaderContent = computed(() => page.value?.description ?? '')

const updatePage = async (data: Record<string, string | boolean>) => {
    try {
        console.log(data)
        isLoading.value = !isLoading.value;
        await usePageStore.updatePageByUuid(page.value!.uuid, data);
        if (!isActive.value) router.push({ name: "chapter", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: route.params.chapterUuid } })
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
            textarea {
                padding: 1.5rem;
                height: 30rem;
            }
        }
    }
}
</style>