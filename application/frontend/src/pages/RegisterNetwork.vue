<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'network'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Register Network'" :segment="'header'" />
                <Typography :content="'Present network can be registered!'" :segment="'paragraph'" />
                <Typography :content="'Should it be registered?'" :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Register'" :on-click="onContinue" />
            <Link :placeholder="'I will do this later...'" :href="onSkip" :segment="'designation'" />
            <Typography :content="'(By doing this your actions will be diminished...)'" :segment="'designation'" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Typography from '@/components/Typography.vue';
import Link from '@/components/Link.vue';
import { useRouter } from 'vue-router';
import { useLoader } from '@/composables/useLoader';
import { useNetwork } from '@/stores/useNetwork';
import { storeToRefs } from 'pinia';
import { useSession } from '@/stores/useSession';
import { useLocalStorage } from '@/composables/useLocalStorage';
const router = useRouter();
const { isLoading } = useLoader()
const { createNetwork } = useNetwork()
const { session } = storeToRefs(useSession());
const { save } = useLocalStorage();
const onContinue = async () => {
    try {
        isLoading.value = !isLoading.value;
        navigator.geolocation.getCurrentPosition(async (position) => {
            await createNetwork(session.value!.userUuid, position.coords.latitude, position.coords.longitude);
            save('is_network_unknown', false);
            return router.push("/dashboard")
        })
    } finally {
        isLoading.value = !isLoading.value;
    }
};
const onSkip = () => {
    save('is_network_unknown', true);
    return router.push("/dashboard");
}
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
        gap: 1.25rem;

        text-align: center;

        &--text-block {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
    }
}
</style>