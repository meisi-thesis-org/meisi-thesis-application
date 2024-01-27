<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'pencil'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Recover Book'" :segment="'header'" />
                <Typography :content="'It seems that you have deactived this book.'" :segment="'paragraph'" />
                <Typography :content="'Do you wish to recover it?'" :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Recover'" :on-click="onContinue" />
            <Link :placeholder="'I will do this later...'" :href="onSkip" :segment="'designation'" />
            <Typography :content="'(By doing this you cannot share your content for this book...)'" :segment="'designation'" />
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
import { useBook } from '@/stores/useBook';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();
const { isLoading } = useLoader()
const useBookStore = useBook();
const { books } = storeToRefs(useBookStore);

const book = computed(() => books.value.find((book) => book.uuid === route.params.bookUuid))

const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        if (book.value === undefined) return router.push({ name: "dossier", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid }  })
        await useBookStore.updateBookByUuid(book.value.uuid, { active: !book.value.active });
        return router.push({ name: "book", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: book.value.uuid } })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => router.push({ name: "dossier", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid } });
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