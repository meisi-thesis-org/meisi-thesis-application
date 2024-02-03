<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'pencil'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Recover Chapter'" :segment="'header'" />
                <Typography :content="'It seems that you have deactived this chapter.'" :segment="'paragraph'" />
                <Typography :content="'Do you wish to recover it?'" :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Recover'" :on-click="onContinue" />
            <Link :placeholder="'I will do this later...'" :href="onSkip" :segment="'designation'" />
            <Typography :content="'(By doing this you cannot share your content for this chapter...)'" :segment="'designation'" />
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
import { computed } from 'vue';
import { useChapter } from '@/stores/useChapter';

const router = useRouter();
const route = useRoute();
const { isLoading } = useLoader()
const useChapterStore = useChapter();
const { chapters } = storeToRefs(useChapterStore);

const chapter = computed(() => chapters.value.find((chapter) => chapter.uuid === route.params.chapterUuid))

const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        if (chapter.value === undefined) return router.push({ name: "book", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid } });
        await useChapterStore.updateChapterByUuid(chapter.value.uuid, { active: !chapter.value.active });
        return router.push({ name: "chapter", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: chapter.value.uuid } })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => router.push({ name: "book", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid } });
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