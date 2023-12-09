<template>
    <div id="form-action">
        <div id="form-action__buttons">
            <Button v-for="button of definedProps.buttons" :placeholder="button.placeholder" />
        </div>
        <div id="form-action__links">
            <Link v-for="link of definedProps.links" :placeholder="link.placeholder" :href="link.href" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormActionProps } from '@/types/FormAction';
import Button from './Button.vue';
import Link from './Link.vue';

const definedProps = defineProps<FormActionProps>()
</script>

<style scoped lang="scss">
#form-action {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__links {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }
}
</style>