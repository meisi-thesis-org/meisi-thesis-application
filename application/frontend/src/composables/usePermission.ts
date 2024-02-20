import { useBook } from '@/stores/useBook';
import { useChapter } from '@/stores/useChapter';
import { useDossier } from '@/stores/useDossier';
import { usePage } from '@/stores/usePage';
import { useSubscription } from '@/stores/useSubscription';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, type RouteLocation } from 'vue-router';

export const usePermission = (route: RouteLocation = useRoute()) => {
  const { user } = storeToRefs(useUser());
  const { dossiers } = storeToRefs(useDossier());
  const { books } = storeToRefs(useBook());
  const { chapters } = storeToRefs(useChapter());
  const { pages } = storeToRefs(usePage());
  const { subscriptions } = storeToRefs(useSubscription());

  const isProducerDossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === route.params.dossierUuid && dossier.userUuid === user.value?.uuid))
  const isProducerBook = computed(() => books.value.find((book) => book.uuid === route.params.bookUuid && isProducerDossier.value))
  const isProducerChapter = computed(() => chapters.value.find((chapter) => chapter.uuid === route.params.chapterUuid && isProducerBook.value))
  const isProducerPage = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid && isProducerChapter.value))

  const isOwner = computed(() => true);
  const isGuest = computed(() => false);
  const isProducer = computed(() => (isProducerDossier.value !== undefined || isProducerBook.value !== undefined || isProducerChapter.value !== undefined || isProducerPage.value !== undefined));
  const isConsumer = computed(() => (isProducerDossier.value === undefined && isProducerBook.value === undefined && isProducerChapter.value === undefined && isProducerPage.value === undefined));
  const isSubscribed = computed(() => subscriptions.value.find((subscription) => subscription.dossierUuid === route.params.dossierUuid));

  return { isOwner, isGuest, isProducer, isConsumer, isSubscribed }
}
