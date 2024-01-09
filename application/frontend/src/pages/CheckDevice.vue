<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <Icon :name="'device'" :height="'5rem'" :width="'5rem'" />
            <div id="wrapper__inner--text-block">
                <Typography :content="'Unknown Device'" :segment="'header'" />
                <Typography :content="'It seems that the used device is unknown. Your actions will be diminished.'"
                    :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Continue'" :on-click="onContinue" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button.vue';
import Icon from '@/components/Icon.vue';
import Typography from '@/components/Typography.vue';
import { useSession } from '@/stores/useSession';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const { session } = storeToRefs(useSession())
const onContinue = () => {
    return router.push(`/${session.value?.userUuid}/check-network`);
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