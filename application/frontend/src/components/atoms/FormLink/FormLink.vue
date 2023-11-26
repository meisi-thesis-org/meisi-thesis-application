<template>
    <Typography id="form-link" v-on:click="redirectUser()" :content="definedProps.content" :segment="'designation'" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import Typography from '../Typography/Typography.vue';
import type { FormLinkProps } from './FormLink.type';

const { push } = useRouter()

const definedProps = defineProps<FormLinkProps>()

const redirectUser = () => {
    push(definedProps.href)
}
</script>

<style scoped lang="scss">
#form-link {
    cursor: pointer;
}
</style>