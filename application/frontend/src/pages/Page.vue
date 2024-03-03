<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Navbar />
            <div id="wrapper__inner--content">
                <Banner :header-content="page?.designation ?? ''" :icons="bannerIcons" :groups="bannerGroups"
                    :color="'light-colorized'" :is-editable="isProducer && isOwner"
                    :on-blur="(data: string) => updatePage({ designation: data })" />
                <EditableField
                    :content="isOwner && (isProducer || isDossierSubscribed || isBookSubscribed || isChapterSubscribed || isPageSubscribed) ? subHeaderContent : loremIpsum"
                    :max-length="'1500'" :is-editable="isProducer && isOwner"
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
import { useSubscription } from "@/stores/useSubscription";
import { useWallet } from "@/stores/useWallet";
import type { BannerGroupProps } from "@/types/Banner";
import type { IconProps } from "@/types/Icon";
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const usePageStore = usePage();
const useSubscriptionStore = useSubscription();
const useWalletStore = useWallet();
const { isLoading } = useLoader();
const { pages } = storeToRefs(usePageStore);
const { subscriptions } = storeToRefs(useSubscriptionStore);
const { wallet } = storeToRefs(useWalletStore);
const { isProducer, isConsumer, isDossierSubscribed, isBookSubscribed, isChapterSubscribed, isPageSubscribed, isOwner } = usePermission();

const page = computed(() => pages.value.find((page) => page.uuid === route.params.pageUuid))
const isVisible = computed(() => (page.value && page.value.visible) ?? false)
const isActive = computed(() => (page.value && page.value.active) ?? false)
const subHeaderContent = computed(() => page.value?.description ?? '')

const bannerIcons = computed<Array<IconProps & { isVisible: boolean }>>(() => ([
    { name: 'lock', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isConsumer.value && !isDossierSubscribed.value && !isBookSubscribed.value && !isChapterSubscribed.value && !isPageSubscribed.value && isActive.value && isVisible.value && isOwner.value), onClick: () => toggleSubscription() },
    { name: 'watcher', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && !isVisible.value && isOwner.value), onClick: () => updatePage({ visible: true }) },
    { name: 'watcher-off', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isVisible.value && isOwner.value), onClick: () => updatePage({ visible: false }) },
    { name: 'trashcan', height: '1.25rem', width: '1.25rem', color: 'light-colorized', isVisible: !!(isProducer.value && isOwner.value), onClick: () => updatePage({ active: false }) },
]))

const bannerGroups = computed<Array<BannerGroupProps>>(() => [
    { type: 'editableControl', content: page.value?.price ?? 0, contentType: 'number', designation: 'Price: ', color: "light-colorized", isEditable: isProducer.value && isOwner.value, onBlur: (price: number) => updatePage({ price }) },
])

const updatePage = async (data: Record<string, string | boolean | number>) => {
    try {
        isLoading.value = !isLoading.value;
        await usePageStore.updatePageByUuid(page.value!.uuid, data);
        if (!isActive.value) router.push({ name: "chapter", params: { userUuid: route.params.userUuid, dossierUuid: route.params.dossierUuid, bookUuid: route.params.bookUuid, chapterUuid: route.params.chapterUuid } })
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const toggleSubscription = async () => {
    try {
        isLoading.value = !isLoading.value;
        const foundSubscription = subscriptions.value.find((subscription) => subscription.pageUuid === page.value?.uuid)
        if (!foundSubscription) await useSubscriptionStore.createSubscription({ walletUuid: wallet.value?.uuid, pageUuid: page.value?.uuid });
        if (foundSubscription) await useSubscriptionStore.updateSubscriptionByUuid(foundSubscription.uuid, { active: !foundSubscription.active, visible: !foundSubscription.visible });
        isLoading.value = !isLoading.value;
    } catch (error) {
        isLoading.value = !isLoading.value;
    }
}

const loremIpsum = computed(() => (
    `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra congue justo sed varius. Duis egestas magna a ex eleifend faucibus. Praesent pharetra sem non tincidunt condimentum. Curabitur vehicula quam ipsum, ac pellentesque ex aliquam a. Duis finibus turpis neque, et consequat libero suscipit vel. Morbi ornare ex suscipit nibh volutpat congue. Nullam vel dictum nulla.
    Praesent tincidunt ut tortor nec mollis. Sed et augue mauris. Nulla ut leo id sem eleifend auctor. Ut cursus, augue sit amet viverra gravida, libero ipsum finibus purus, a imperdiet nunc tellus vel massa. Fusce congue sem eget arcu faucibus, malesuada efficitur risus tristique. Mauris venenatis mollis eros, at volutpat est fringilla in. Etiam commodo varius risus eu facilisis. Nulla vitae maximus sem. Quisque efficitur fermentum enim, et lobortis mi. Nam odio nisi, cursus nec efficitur nec, congue non erat. Praesent consequat ex nec tristique tempor. Sed faucibus lectus a leo condimentum, eget cursus quam commodo. Maecenas ac lorem ligula.
    Aliquam sed mi vulputate, congue diam in, hendrerit magna. Mauris sodales auctor ex non aliquet. Donec vel feugiat mauris. Proin sed convallis augue, sit amet euismod ipsum. Aenean cursus, dolor a ultrices ultricies, tortor libero imperdiet nunc, eget blandit quam mauris in est. Integer tincidunt felis fringilla mi rhoncus lacinia. Maecenas fermentum vulputate porttitor. Etiam eget felis viverra, commodo purus eget, tincidunt mi. Quisque varius dapibus diam nec fringilla. Curabitur accumsan diam diam. Etiam imperdiet urna egestas ullamcorper facilisis.
    Mauris rhoncus odio erat, ut lacinia justo maximus at. Proin dapibus fermentum metus pellentesque aliquam. Cras quis metus justo. Quisque vestibulum in ipsum in dictum. Pellentesque egestas in leo id fringilla. In euismod risus id mollis tincidunt. Suspendisse sed tempor orci. Cras in mi at purus blandit convallis et et risus. Quisque vel suscipit metus. Sed rhoncus ultricies ligula rhoncus finibus. Proin eu diam lacus.
    Mauris vitae est et ante placerat feugiat. Quisque justo justo, rhoncus in pellentesque ac, ullamcorper nec enim. Duis at turpis ac magna pellentesque viverra. Morbi tristique diam sit amet lacus varius, et sodales massa malesuada. Cras id nisi convallis erat mattis condimentum. Pellentesque in sapien et ex lobortis sagittis vitae sed dolor. Ut pulvinar dui mauris, ac mattis odio ultricies eget.`
))

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