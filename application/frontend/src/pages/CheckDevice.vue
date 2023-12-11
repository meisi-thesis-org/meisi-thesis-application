<template>
    <div id="wrapper">
        <div id="wrapper__inner">
            <div id="wrapper__inner--text-block">
                <Typography 
                :content="'Unknown Device'" 
                :segment="'header'" />
                <Typography 
                :content="'It seems that the used device is unknown. Your actions will be diminished.'"
                :segment="'paragraph'" />
            </div>
            <Button :placeholder="'Continue'" :on-click="onClick" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Typography from '@/components/Typography.vue';
import Button from '@/components/Button.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const onClick = () => router.push("/check-network")
</script>

<style scoped lang="scss">
#wrapper {
    min-height: inherit;

    &__inner {
        min-height: inherit;

        padding: 0 2.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 1.5rem;

        &--text-block {
            text-align: center;

            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
    }
}
</style>