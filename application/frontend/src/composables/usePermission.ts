import { useBook } from '@/stores/useBook';
import { useChapter } from '@/stores/useChapter';
import { useDevice } from '@/stores/useDevice';
import { useDossier } from '@/stores/useDossier';
import { useNetwork } from '@/stores/useNetwork';
import { usePage } from '@/stores/usePage';
import { useSession } from '@/stores/useSession';
import { useSubscription } from '@/stores/useSubscription';
import { useUser } from '@/stores/useUser';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, type RouteLocation } from 'vue-router';
import { useLocation } from './useLocation';

export const usePermission = (route: RouteLocation = useRoute()) => {
  const { user } = storeToRefs(useUser());
  const { dossiers } = storeToRefs(useDossier());
  const { books } = storeToRefs(useBook());
  const { chapters } = storeToRefs(useChapter());
  const { pages } = storeToRefs(usePage());
  const { subscriptions } = storeToRefs(useSubscription());
  const { devices } = storeToRefs(useDevice());
  const { networks } = storeToRefs(useNetwork());
  const { session } = storeToRefs(useSession());
  const { location } = useLocation();

  const isProducerDossier = computed(() => dossiers.value.find((dossier) => dossier.uuid === route.params.dossierUuid && dossier.userUuid === user.value?.uuid))
  const isProducerBook = computed(() => books.value.find((book) => book.uuid === route.params.bookUuid && isProducerDossier.value))
  const isProducerChapter = computed(() => chapters.value.find((chapter) => chapter.uuid === route.params.chapterUuid && isProducerBook.value))
  const isProducerPage = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid && isProducerChapter.value))
  const isTrustedDevice = computed(() => devices.value?.find(({ userUuid, userAgent }) => userAgent === navigator.userAgent && userUuid === session.value?.userUuid));
  const isTrustedNetwork = computed(() => {
    return networks.value.find(({ userUuid, latitude, longitude }) => {
      return (
        userUuid === session.value?.userUuid &&
        (
          latitude >= location.value.latitude - 10 &&
          latitude <= location.value.latitude + 10 &&
          longitude >= location.value.longitude - 10 &&
          longitude <= location.value.longitude + 10
        )
      )
    })
  });

  const isOwner = computed(() => !!(isTrustedDevice.value && isTrustedNetwork.value));
  const isGuest = computed(() => !(isTrustedDevice.value || isTrustedNetwork.value));

  const isProducer = computed(() => (isProducerDossier.value !== undefined || isProducerBook.value !== undefined || isProducerChapter.value !== undefined || isProducerPage.value !== undefined));
  const isConsumer = computed(() => (isProducerDossier.value === undefined && isProducerBook.value === undefined && isProducerChapter.value === undefined && isProducerPage.value === undefined));

  /** Subscribed Chaindown */
  const isDossierSubscribed = computed(() => subscriptions.value.find((subscription) => !!(subscription.dossierUuid === route.params?.dossierUuid && (subscription.active && subscription.visible))));
  const isBookSubscribed = computed(() => subscriptions.value.find((subscription) => !!(subscription.bookUuid === route.params?.bookUuid && (subscription.active && subscription.visible))));
  const isChapterSubscribed = computed(() => subscriptions.value.find((subscription) => !!(subscription.chapterUuid === route.params?.chapterUuid && (subscription.active && subscription.visible))));
  const isPageSubscribed = computed(() => subscriptions.value.find((subscription) => !!(subscription.pageUuid === route.params?.pageUuid && (subscription.active && subscription.visible))));

  return { isOwner, isGuest, isProducer, isConsumer, isDossierSubscribed, isBookSubscribed, isChapterSubscribed, isPageSubscribed }
}
