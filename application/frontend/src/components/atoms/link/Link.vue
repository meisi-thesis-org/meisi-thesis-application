<template>
    <a @click="navigate()" id="link">
        <Typography :content="definedProps.content" :segment="'placeholder'" />
    </a>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/typography/Typography.vue";
import type { LinkProps } from "./Link.type";
import { useRouter } from "vue-router";
const definedProps = defineProps<LinkProps>()
const router = useRouter();
const navigate = () => router.push(definedProps.href)
</script>

<style scoped lang="scss">
#link {
    text-decoration: none;
    cursor: pointer;
}
</style>
