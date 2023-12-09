<template>
    <div @click="navigate()" id="link">
        <Typography :content="definedProps.placeholder" :segment="'designation'" />
    </div>
</template>

<script setup lang="ts">
import Typography from './Typography.vue';
import type { LinkProps } from '@/types/Link';
import { useRouter } from 'vue-router';
const router = useRouter()

const definedProps = defineProps<LinkProps>()
const navigate = () => router.push(definedProps.href)
</script>

<style scoped lang="scss">
#link {
    cursor: pointer;
}
</style>