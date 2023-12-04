<template>
    <div id="form-action">
        <div id="form-action__inner">
            <div id="form-action__inner--buttons">
                <div id="form-action__inner--buttons__item" v-for="button of definedProps.buttons">
                    <Button />
                </div>
            </div>
            <div id="form-action__inner--links">
                <div id="form-action__inner--links__item" v-for="link of definedProps.links">
                    <Link />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormActionProps } from './FormAction.type';
import Button from "@/components/atoms/button/Button.vue";
import Link from "@/components/atoms/button/Link.vue";

const definedProps = defineProps<FormActionProps>()
</script>

<style scoped lang="scss"></style>