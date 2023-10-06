<template>
    <div class="container">
        <div class="container__inner">
            <IconComponent :name="'device'"></IconComponent>
            <TypographyComponent class="container__inner--block" :segment="'paragraph'" :content="typographySegment()">
            </TypographyComponent>
            <FormControlComponent v-on:click="doNavigationCheckLocation()" class="container__inner--button" :type="'submit'"
                :value="'Continue'"></FormControlComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconComponent } from "./../../components/atoms/icon";
import { TypographyComponent } from "./../../components/atoms/typography";
import { FormControlComponent } from "./../../components/atoms/form-control";
import { useRouter, useRoute } from "vue-router";

const { push } = useRouter();
const { meta } = useRoute();

const typographySegment = (): string => {
    return meta.location !== undefined ?
        "Authorized location! You will have full permissions during your visit to the platform." :
        "Unauthorized location! You will have restricted actions permissions during your visit to the platform."
};

const doNavigationCheckLocation = async () => await push('/dashboard');
</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    min-height: inherit;

    &__inner {
        min-height: inherit;

        padding: 0 20%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 1.5rem;

        &--block {
            line-height: 1.5rem;
            text-align: justify;
            text-align-last: center;
        }

        &--button {
            width: 100%;
        }
    }
}

@media(min-width:720px) {
    .container {
        .container__inner {
            gap: 2rem;
            padding: 0 35%;
        }
    }
}
</style>