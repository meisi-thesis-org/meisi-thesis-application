<template>
    <div id="form-action">
        <div id="form-action__inner">
            <div id="form-action__inner--buttons">
                <div id="form-action__inner--buttons__item" v-for="button of definedProps.buttons">
                    <Button :content="button.content" :type="button.type" />
                </div>
            </div>
            <div id="form-action__inner--links">
                <div id="form-action__inner--links__item" v-for="link of definedProps.links">
                    <Link :content="link.content" :href="link.href" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormActionProps } from './FormAction.type';
import Button from "@/components/atoms/button/Button.vue";
import Link from "@/components/atoms/link/Link.vue";

const definedProps = defineProps<FormActionProps>()
</script>

<style scoped lang="scss">
#form-action {
    &__inner {
        display: flex;
        flex-direction: column;
        gap: .75rem;

        &--links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }
}
</style>