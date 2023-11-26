<template>
    <div id="form-button" class="card">
        <Typography type="submit" :content="definedProps.content" :segment="'paragraph'" :color="definedProps.color" />
    </div>
</template>

<script setup lang="ts">
import Typography from "@/components/atoms/Typography/Typography.vue"
import type { FormButtonProps } from "./FormButton.type";
const definedProps = defineProps<FormButtonProps>()
</script>

<style scoped lang="scss">
#form-button {
    cursor: pointer;
}
</style>